import { sql } from '@vercel/postgres';
import {
  TabsTable,
  MyTabsTable,
  User,
  Chords,
  Lessons,
  Achievement,
  Tabs
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredTabs(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tabs = await sql<TabsTable>`
      SELECT
        tabs.id,
        tabs.name,
        tabs.artist,
        tabs.date,
        COUNT(user_tabs.tab_id) AS favorites_count
      FROM
        tabs
      LEFT JOIN
        user_tabs ON tabs.id = user_tabs.tab_id
      WHERE
        (tabs.name::text ILIKE ${`%${query}%`} OR
        tabs.artist::text ILIKE ${`%${query}%`} OR
        tabs.date::text ILIKE ${`%${query}%`})
        AND (tabs.published = true)
      GROUP BY
        tabs.id
      ORDER BY
        tabs.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tabs.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tabs.');
  }
}

export async function fetchFilteredAdminTabs(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tabs = await sql<MyTabsTable>`
      SELECT
        tabs.id,
        tabs.name,
        tabs.artist,
        tabs.date,
        COUNT(user_tabs.tab_id) AS favorites_count,
        tabs.published,
        tabs.finished
      FROM
        tabs
      LEFT JOIN
        user_tabs ON tabs.id = user_tabs.tab_id
      WHERE
        (tabs.name::text ILIKE ${`%${query}%`} OR
        tabs.artist::text ILIKE ${`%${query}%`} OR
        tabs.date::text ILIKE ${`%${query}%`})
        AND (tabs.finished = true)
        AND (tabs.published = false)
      GROUP BY
        tabs.id
      ORDER BY
        tabs.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tabs.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tabs.');
  }
}

export async function fetchMyFilteredTabs(
  query: string,
  currentPage: number,
  userId: string,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tabs = await sql<MyTabsTable>`
      SELECT
        tabs.id,
        tabs.name,
        tabs.artist,
        tabs.user_id,
        tabs.date,
        COUNT(user_tabs.tab_id) AS favorites_count,
        tabs.published,
        tabs.finished
      FROM
        tabs
      LEFT JOIN
        user_tabs ON tabs.id = user_tabs.tab_id
      WHERE
        (tabs.name::text ILIKE ${`%${query}%`} OR
        tabs.artist::text ILIKE ${`%${query}%`} OR
        tabs.date::text ILIKE ${`%${query}%`})
        AND (tabs.user_id = ${userId} OR user_tabs.user_id = ${userId})
      GROUP BY
        tabs.id
      ORDER BY
        tabs.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tabs.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch my tabs.');
  }
}

export async function userTabCount(id: string) : Promise<number> {
  noStore();

  try {
    const data = await sql`
      SELECT *
      FROM tabs
      WHERE user_id=${id}
    `;

    return data.rowCount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function isTabFinished(id: string) : Promise<boolean> {
  noStore();

  try {
    const data = await sql`
      SELECT finished 
      FROM tabs
      WHERE id=${id}
    `;

    return data.rows[0].finished;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function isTabPublic(id: string) : Promise<boolean> {
  noStore();

  try {
    const data = await sql`
      SELECT published 
      FROM tabs
      WHERE id=${id}
    `;

    return data.rows[0].published;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function isTabOwner(id: string, user_id: string) : Promise<boolean> {
  noStore();

  try {
    const data = await sql`
      SELECT *
      FROM tabs
      WHERE id=${id} AND user_id=${user_id}
    `;
    
    return data.rowCount > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function userPublicTabs(user_id: string) {
  noStore();

  try {
    const data = await sql<MyTabsTable>`
      SELECT *
      FROM tabs
      WHERE user_id=${user_id} AND published = true
    `;
    
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function isTabLikedByUser(id: string, user_id: string) : Promise<boolean> {
  noStore();

  try {
    const data = await sql`
      SELECT *
      FROM user_tabs
      WHERE tab_id=${id} AND user_id=${user_id}
    `;

    return data.rowCount > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function fetchTabsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tabs
    WHERE
      (tabs.name::text ILIKE ${`%${query}%`} OR
      tabs.artist::text ILIKE ${`%${query}%`})
      AND tabs.published = true
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tabs.');
  }
}

export async function fetchMyTabsPages(query: string, userId: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tabs
    JOIN users ON tabs.user_id = users.id
    WHERE
      (tabs.name::text ILIKE ${`%${query}%`} OR
      tabs.artist::text ILIKE ${`%${query}%`})
      AND (tabs.user_id = ${userId} OR
      tabs.id IN (SELECT tab_id FROM user_tabs WHERE user_id = ${userId}))
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tabs.');
  }
}

export async function fetchAdminTabsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tabs
    WHERE
      (tabs.name::text ILIKE ${`%${query}%`} OR
      tabs.artist::text ILIKE ${`%${query}%`})
      AND tabs.finished = true
      AND tabs.published = false
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tabs.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchChords() {
  noStore();
  try {
    const data = await sql<Chords>`
      SELECT *
      FROM chords
      ORDER BY tone ASC
    `;

    const chords = data.rows;
    return chords;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all chords.');
  }
}

export async function fetchChordId(tone: string, semitone: string): Promise<string> {
  try {
    const data = await sql`
      SELECT id
      FROM chords
      WHERE tone = ${tone} AND semitone = ${semitone}
    `;

    return data.rows[0].id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch chord ID.');
  }
}

export async function fetchTabChords(id: string): Promise<Chords[]> {
  try {
    const chordsData = await sql<Chords>`
      SELECT chords.*
      FROM chords
      INNER JOIN tab_chords ON tab_chords.chord_id = chords.id
      WHERE tab_chords.tab_id = ${id}
    `;

    return chordsData.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tab chords.');
  }
}

export async function fetchTabId(name: string, artist: string, user_id: string): Promise<string> {
  try {
    const data = await sql`
      SELECT id
      FROM tabs
      WHERE name = ${name} AND artist = ${artist} AND user_id = ${user_id}
    `;

    return data.rows[0].id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tab ID.');
  }
}

export async function fetchTabById(id: string): Promise<Tabs> {
  try {
    const data = await sql`
      SELECT *
      FROM tabs
      WHERE id = ${id}
    `;

    return data.rows[0] as Tabs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tab ID.');
  }
}

export async function fetchLessons() {
  noStore();
  try {
    const data = await sql<Lessons>`
      SELECT *
      FROM lessons
      ORDER BY name ASC
    `;

    const lessons = data.rows;
    return lessons;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all lessons.');
  }
}

export async function isLessonCompleted(
  user: User,
  lesson_id: string,
) {
  try {
    const data = await sql`
      SELECT *
      FROM user_lessons
      WHERE user_id = ${user.id}
      AND lesson_id = ${lesson_id}
    `;

    const completed = data.rows.length > 0;
    return completed;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch completed lessons.');
  }
}

export async function fetchUserAchievements(
  user: User,
) {
  noStore();
  try {
    const data = await sql<Achievement>`
      SELECT a.id, a.name, a.description
      FROM achievements a
      JOIN user_achievements ua ON a.id = ua.achievement_id
      WHERE ua.user_id = ${user.id};
    `;

    const achievements = data.rows;
    return achievements;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all achievements.');
  }
}

export async function fetchUserById(
  id: string,
): Promise<User> {
  noStore();
  try {
    const data = await sql<User>`
      SELECT *
      FROM users
      WHERE id = ${id};
    `;

    const user = data.rows[0];
    return user;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch user.');
  }
}