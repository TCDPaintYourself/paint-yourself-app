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
  getDoc,
} from 'firebase/firestore'
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
  theme: string
  votes: number
}

export const themeVotesCol = createCollection<ThemeVote>('theme_votes')

export const upvoteTheme = async (theme: string): Promise<void> => {
  const themeVoteRef = doc(themeVotesCol, theme)
  const docSnap = await getDoc(themeVoteRef)
  let data = docSnap.data()
  let new_votes = (data?.votes || 0) + 1
  await updateDoc(themeVoteRef, {
    votes: new_votes,
  })
}

export const downvoteTheme = async (theme: string): Promise<void> => {
  const themeVoteRef = doc(themeVotesCol, theme)
  const docSnap = await getDoc(themeVoteRef)
  let data = docSnap.data()
  let new_votes = (data?.votes || 0) - 1
  await updateDoc(themeVoteRef, {
    votes: new_votes,
  })
}

export const getThemesVote = async (): Promise<ThemeVote[]> => {
  const themesVotesSnap = await getDocs(themeVotesCol)
  let themeVotes: Array<ThemeVote> = []
  themesVotesSnap.docs.forEach((theme: any) => {
    themeVotes.push(theme.data())
  })
  return themeVotes
}

export const getThemeVote = async (theme: number | string): Promise<number> => {
  const themeVotesSnap = await getDocs(themeVotesCol)
  let votes = 0
  themeVotesSnap.docs.forEach((doc: any) => {
    if (doc.data().theme === theme) {
      votes = doc.data().votes
    }
  })
  return votes
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
