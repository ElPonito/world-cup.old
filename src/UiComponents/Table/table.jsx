import React from 'react'
import { Table } from 'reactstrap'

const table = ({head, body}) => {

    const createHead = (head) => {
        const tableHead = head.map((cell, index) => {
            return (
                <th key={index}>{cell.content}</th>
            )
        })
        return (
            <thead>
            <tr>
                {tableHead}
            </tr>
            </thead>
        )
    }

    const createBody = (body) => {
        const tableBody = body.map((row, index) => {
            const tableRow = row.map((cell, index) => {
                return (
                    <td key={index}>{cell.content}</td>
                )
            })
            return (
                <tr key={index}>
                    {tableRow}
                </tr>
            )
        })
        return (
            <tbody>
            {tableBody}
            </tbody>
        )
    }

    return (
        <Table>
            {createHead(head)}
            {createBody(body)}
        </Table>
    )

}

export default table