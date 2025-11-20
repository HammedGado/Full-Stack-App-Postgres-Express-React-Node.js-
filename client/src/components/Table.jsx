function TableHeader(){
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Actions</th>
            </tr>
        </thead> 
    )
}

const TableBody = (props) => {
    if (!props.linkData || props.linkData.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan="3">No links added yet</td>
                </tr>
            </tbody>
        )
    }

    const rows = props.linkData.map((row) => {
        return (
            <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                    <a href={row.url} target="_blank" rel="noopener noreferrer">
                        {row.url}
                    </a>
                </td>
                <td>
                    <button onClick={() => props.editLink(row)} style={{ marginRight: '5px' }}>
                        Edit
                    </button>
                    <button onClick={() => props.removeLink(row.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

function Table(props){
    return(
        <table>
            <TableHeader/>
            <TableBody 
                linkData={props.data}
                removeLink={props.removeLink}
                editLink={props.editLink}
            />
        </table>
    )
}

export default Table

