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

export const upvoteTheme = async (theme: string) => {
  const themeVoteRef = doc(themeVotesCol, theme)
  await updateDoc(themeVoteRef, {
    votes: FieldValue.increment(1),
  })
}

export const downvoteTheme = async (theme: string) => {
  const themeVoteRef = doc(themeVotesCol, theme)
  await updateDoc(themeVoteRef, {
    votes: FieldValue.increment(1),
  })
}

export const getThemes = async () => {
  const themeVotesDocs = await getDocs(themeVotesCol)
  let themeVotes: Array<ThemeVote> = []
  themeVotesDocs.docs.forEach((theme) => {
    themeVotes.push(theme.data())
  })
}
