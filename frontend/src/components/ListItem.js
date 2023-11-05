import React from 'react'
import {Link} from 'react-router-dom'


const getTime = (note) => {
    return new Date(note.updated).toLocaleTimeString()
}

const getTitle = (note) => {
    if (note.body.length < 45) {
        return note.body;
    } else {
        return note.body.slice(0, 45);
    }
}

const getBody = (note) => {
    const titleContent = getTitle(note);
    let content = note.body.replaceAll('\n', '');

    content = content.replaceAll(titleContent, '');

    if (content.length > 45) {
        return content.slice(0, 35) + '...'
    } else return content;
}

const ListItem = ({note}) => {
    return (
        <div>
            <Link to={`/note/${note.id}`}>
                <div className="notes-list-item">
                    <h3>{getTitle(note)}</h3>
                    {/*<h3>{note.body}</h3>*/}
                    <p><span>{getTime(note)}</span>{getBody(note)}</p>
                </div>

            </Link>
        </div>
    )
}

export default ListItem