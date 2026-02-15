
export type LibraryItemType = 'note' | 'bookmark' | 'journal_link';

export type LibraryItem = {
  id: string;
  type: LibraryItemType;
  title: string;
  content: string; // For notes, this is the body. For bookmarks, the URL. For journal_links, the entry ID.
  description?: string; // For bookmarks or notes
  createdAt: string; // ISO string
  tags?: string[];
  bookmarked?: boolean;
};
