import React from 'react'
import { Input, Table } from 'reactstrap'
import './table.less'

const table = ({config, data, checkbox, handleSelect}) => {

    const createHead = (config) => {
        const tableHead = Object.keys(config).map(key => (
            <th key={key}>{config[key]}</th>
            )
        )

        return (
            <thead>
            <tr>
                {checkbox ? <th></th> : null}
                {tableHead}
            </tr>
            </thead>
        )
    }

    const createBody = (config, data) => {
        const tableBody = data.map((row, index) => {
            const tableRow = Object.keys(config).map((key, index) => (
                <td key={row.id ? `${row.id}-${key}` : index}>{row[key]}</td>
            ))
            return (
                <tr key={row.id ? `${row.id}` : index}>
                    {checkbox ?
                        <td><Input type="checkbox" name="checkbox" onClick={event => handleSelect(event, row)}/>
                        </td> : null}
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
            {createHead(config)}
            {createBody(config, data)}
        </Table>
    )

}

export default table