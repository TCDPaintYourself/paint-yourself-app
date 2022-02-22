// Get the imports
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  CollectionReference,
  collection,
  DocumentData,
  doc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import { firebaseConfig } from 'constants/Firebase'
// Init the firebase app
export const firebaseApp = initializeApp(firebaseConfig)
// Export firestore incase we need to access it directly
export const firestore = getFirestore()
// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

export type ThemeVote = {
  Theme: string
  votes: number
}

export const themeVotesCol = createCollection<ThemeVote>('theme_votes')

export const upvoteTheme = async (theme: string): Promise<void> => {
  const themeVoteRef = doc(themeVotesCol, theme)
  await updateDoc(themeVoteRef, {
    votes: FieldValue.increment(1),
  })
}

export const downvoteTheme = async (theme: string): Promise<void> => {
  const themeVoteRef = doc(themeVotesCol, theme)
  await updateDoc(themeVoteRef, {
    votes: FieldValue.increment(-1),
  })
}

export const getThemes = async (): Promise<ThemeVote[]> => {
  const themeVotesDocs = await getDocs(themeVotesCol)
  let themeVotes: Array<ThemeVote> = []
  themeVotesDocs.docs.forEach((theme) => {
    themeVotes.push(theme.data())
  })
  return themeVotes
}

// https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection
/**
 *
 * @param innerFunc A function that does something to the documents
 *
 * Usage
 *
 * @onSnapshotDecor
 * const consoleLog = (querySnapshot: DocumentData) => {
 *  querySnapshot.forEach((theme) => console.log(theme.data()))
 * }
 */
export const onSnapShotDecor = async (innerFunc: (doc: DocumentData) => void) => {
  const q = query(collection(firestore, 'theme_votes'))
  onSnapshot(q, (querySnapshot) => {
    innerFunc(querySnapshot)
  })
}
