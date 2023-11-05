import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {
    const {id} = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await fetch(`/api/notes/${id}`);
                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.log('Error fetching note:', error)
            }
        };
        getNote().then(r => console.log(r));
    }, [id]);

    const createNote = async () => {
        try {
            await fetch('/api/notes/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body: note.body})
            })
            navigate('/');
        } catch (error) {
            console.log('Error creating note', error)
        }
    }
    const updateNote = async () => {
        try {
            await fetch(`/api/notes/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body: note?.body}),
            })
            navigate('/');
        } catch (error) {
            console.log('Error updating Note', error);
        }
    }

    const deleteNote = async () => {
        try {
            await fetch(`/api/notes/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate('/');
        } catch (error) {
            console.log('Error deleting the Note', error)
        }
    }

    const handleSubmit = () => {
        if (id !== 'new' && note.body === '') {
            deleteNote().then(r => console.log(r));
        } else if (id !== 'new') {
            updateNote().then(r => console.log(r));
        } else if (id === 'new' && note.body !== '') {
            createNote().then(r => console.log(r))
        }
    }

    const handleChange = (value) => {
        setNote(prevNote => ({
            ...prevNote,
            'body': value
        }));
    };

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <Link to={'/'} onClick={handleSubmit}>
                        <ArrowLeft/>
                    </Link>
                </h3>
                {id !== 'new' ?
                    (<button onClick={deleteNote}>Delete</button>)
                    :
                    (<button onClick={handleSubmit}>Done</button>)
                }

            </div>
            <textarea onChange={(e) => {
                handleChange(e.target.value)
            }} value={note?.body}></textarea>
        </div>
    );
};

export default NotePage;
