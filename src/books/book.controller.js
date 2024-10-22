const Book = require("./book.model")

//post a book
const postABook = async(req, res) =>{
    try {
        const newBook = await Book({...req.body})
        await newBook.save()
        res.status(200).send({message: "Book posted successfully", book: newBook})
    } catch (error) {
        console.error("Error creating book", error)
        res.status(500).send({message: "Failed to create a book"})
    }

}

//get all books
const getAllBooks = async(req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1})
        res.status(200).send(books)  
    } catch (error) {
        console.error("Error fetching books", error)
        res.status(500).send({message: "Failed to fetch books"})
    }
}

//get a single book
const getSingleBook = async (req, res) =>{
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if(!book){
            res.status(404).send({message: "Book not found!"})
        }
        res.status(200).send(book)  
    } catch (error) {
        console.error("Error fetching book", error)
        res.status(500).send({message: "Failed to fetch the book"})
    }
}

//update book data
const UpdateBook = async (req, res) =>{
    try {
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new : true})
        if(!updatedBook){
            res.status(404).send({message: "Book not found!"})  
        }
        res.status(200).send({
            message : "Book updated Successfully",
            book : updatedBook
        })  
    } catch (error) {
        console.error("Error in updating the book", error)
        res.status(500).send({message: "Failed to update the book"})
    }
}

//delete a book
const deleteABook = async(req, res) =>{
    try {
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook){
            res.status(404).send({message: "Book not found!"})  
        }
        res.status(200).send({
            message : "Book deleted Successfully",
            book : deletedBook
        }) 
    } catch (error) {
        console.error("Error in deleting the book", error)
        res.status(500).send({message: "Failed to delete the book"})
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}