import Table from "./Table"
import Form from "./Form"
import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

function LinkContainer(){ 
    const [favLinks, setFavLinks] = useState([])
    const [editingLink, setEditingLink] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch all links from API
    useEffect(() => {
        fetchLinks()
    }, [])

    const fetchLinks = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/links`)
            setFavLinks(response.data)
            setError(null)
        } catch (err) {
            console.error("Error fetching links:", err)
            setError("Failed to load links. Make sure the server is running.")
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/links/${id}`)
            setFavLinks(favLinks.filter(link => link.id !== id))
            setError(null)
        } catch (err) {
            console.error("Error deleting link:", err)
            setError("Failed to delete link")
        }
    }

    const handleSubmit = async (name, url, id = null) => {
        try {
            if (id) {
                // Update existing link
                const response = await axios.put(`${API_URL}/api/links/${id}`, { name, url })
                setFavLinks(favLinks.map(link => link.id === id ? response.data : link))
                setEditingLink(null)
            } else {
                // Create new link
                const response = await axios.post(`${API_URL}/api/links`, { name, url })
                setFavLinks([...favLinks, response.data])
            }
            setError(null)
        } catch (err) {
            console.error("Error saving link:", err)
            setError(id ? "Failed to update link" : "Failed to create link")
        }
    }

    const handleEdit = (link) => {
        setEditingLink(link)
    }

    const handleCancelEdit = () => {
        setEditingLink(null)
    }

    return(
        <div>
            <h1>My Favorite Links</h1>
            <p>Add, edit, or delete your favorite links!</p>
            {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
            {loading ? (
                <p>Loading links...</p>
            ) : (
                <Table 
                    data={favLinks} 
                    removeLink={handleRemove}
                    editLink={handleEdit}
                />
            )}
            <h1>{editingLink ? "Edit Link" : "Add New Link"}</h1>
            <Form 
                submitNewLink={handleSubmit}
                editingLink={editingLink}
                cancelEdit={handleCancelEdit}
            />
        </div>
    )
}

export default LinkContainer