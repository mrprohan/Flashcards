'use client'

import { useUser } from "@clerk/nextjs"
import { Merge } from "@mui/icons-material"
import { Box, Card, CardActionArea, CardContent, Container, Grid, Paper, TextField, Typography, Button } from "@mui/material"
import { collection, doc, getDoc, writeBatch } from "firebase/firestore"
import { useRouter } from 'next/navigation'  // Changed this import
import { useState } from "react"
import { db } from '../lib/firebase'  // Make sure this path is correct

export default function Generate(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName]=useState('')
    const [open, setOpen]=useState(false)
    const router = useRouter()  // This should now work correctly

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ text }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFlashcards(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleCardClick = (id) => {
        setFlipped((prev)=>({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const saveFlashcards = async () => {
        if (!name){
            alert('Enter name of flashcard')
            return
        }
        try {
            const batch = writeBatch(db)
            const userDocRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(userDocRef)

            if (docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                if (collections.find((f)=> f.name===name)){
                    alert('Flashcard with this name already exists')
                    return
                }else{
                    collections.push({name})
                    batch.set(userDocRef, {flashcards: collections},{merge:true})
                }
            }else{
                batch.set(userDocRef, {flashcards: [{name}]})
            }
            const colRef = collection(userDocRef, name)
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(colRef)
                batch.set(cardDocRef, flashcard)
            })
            await batch.commit()
            handleClose()
            router.push('/flashcards')
        } catch (error) {
            console.error('Error saving flashcards:', error);
            alert('An error occurred while saving the flashcards');
        }
    }

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>
    }

    return (
        <Container maxWidth="md">
            <Box
            sx={{
                mt:4, mb:6, display: 'flex', flexDirection:'column', alignItems:'center',
                backgroundColor: '#F5F1E1' // Soft cream background
            }}
            >
                <Typography variant="h4" sx={{ color: '#E97451' }}>Generate Flashcards</Typography>
                <Paper sx={{p:4, width:"100%", backgroundColor: '#F5F1E1' }}>
                    <TextField 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                    sx={{ input: { color: '#E97451' } }}
                    />
                </Paper>
                <Box sx={{mt: 2}}>
                    <Button 
                    onClick={handleSubmit} 
                    variant="contained"
                    sx={{ backgroundColor: '#E97451', color: '#F5F1E1' }}>Generate</Button>
                </Box>
            </Box>
            {flashcards.length > 0 && (
                <Box sx={{mt: 4}}>
                    <Typography variant="h5" sx={{ color: '#E97451' }}>Your Flashcards</Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardActionArea
                                    onClick={()=> handleCardClick(index)}
                                    >
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index]
                                                    ? 'rotateY(180deg)':'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: '#E97451',
                                                    color: '#F5F1E1'
                                                },
                                                '& > div > div:nth-of-type(2)':{
                                                    transform: 'rotateY(180deg)',
                                                    backgroundColor: '#F5F1E1',
                                                    color: '#E97451'
                                                },
                                            }}>
                                                <div>
                                                    <Typography variant="subtitle1">
                                                        {flashcard.language}
                                                    </Typography>
                                                    <Typography variant="h5" component="div" sx={{ mt: 2, mb: 2 }}>
                                                        {flashcard.word}    
                                                    </Typography> 
                                                    <Typography variant="subtitle1">
                                                        {flashcard.translation}
                                                    </Typography>   
                                                </div>
                                                <div>
                                                    <Typography variant="subtitle1">
                                                        {flashcard.language}
                                                    </Typography>
                                                    <Typography variant="h5" component="div" sx={{ mt: 2, mb: 2 }}>
                                                        {flashcard.word}    
                                                    </Typography> 
                                                    <Typography variant="subtitle1">
                                                        {flashcard.translation}
                                                    </Typography>   
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    )
}