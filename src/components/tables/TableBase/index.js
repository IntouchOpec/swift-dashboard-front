import React, { useState, useEffect } from 'react'
import { Table, Card } from 'reactstrap'
import Search from './Search'
import LoadingTable from './LoadingTable'
import client from 'utils/client'

const makePaginationList = (count, limit) => {
    let page_list = []
    if (count < limit) {
        page_list.push({value: 1, label: `Page 1`})
        return page_list
    }
    for (let index = 1; index <= Math.ceil(count / 10); index++) {
        page_list.push({value: index, label: `Page ${index}`})
    }
    return page_list
}


const TableBase = props => {
    const { 
        keys, 
        RowRender, 
        createPath, 
        filterOptions, 
        limit,
        url,
        persissionName,
        isMock,
        mockData,
    } = props
    
    const [rows, setRows] = useState([])
    const [search, setSearch] = useState('')
    const [pages, setPages] = useState()
    const [page, setPage] = useState({value: 1, label: 'Page 1'})
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState(filterOptions[0])
    
    useEffect(() => {
        client.get(`${url}?limit=${limit}&page=1`)
        .then(res => {
            setPages(makePaginationList(res.data.count, limit))
            setPage({value: 1, label: 'Page 1'})
            setRows(res.data.result)
            setLoading(false)
        })
    }, [])

    const onClickPage = page => {
        setLoading(true)
        client.get(`${url}?limit=${limit}&page=${page.value}`)
        .then(res => {
            setRows(res.data.result)
            setPage({value: page.value, label: `Page ${page.value}`})
            setLoading(false)
        })
    }

    const onClickFilter = field => {
        setFilter(field)
    }

    const searchHandler = () => {
        if (!search) {
            client.get(`${url}?limit=${limit}&page=1`)
            .then(res => {
                setRows(res.data.result)
                setPages(makePaginationList(res.data.count))
                setPage({value: 1, label: 'Page 1'})
                setLoading(false)
            })
        }
        client.get(`${url}?limit=${limit}&page=1&text=${search}&search=${filter.value}`)
        .then(res => {
            setRows(res.data.result)
            setPage({value: page.value, label: `Page ${page.value}`})
            setLoading(false)
        })
    }

    return (
        <Card>
            <Search 
                filterOptions={filterOptions} 
                createPath={createPath} 
                search={search} 
                filter={filter}
                page={page}
                persissionName={persissionName}
                pages={pages}
                setSearch={setSearch}
                searchHandler={searchHandler} 
                onClickFilter={onClickFilter}
                onClickPage={onClickPage}
            />
            <Table responsive striped>
                <thead>
                    <tr>
                        {keys.map(key => <th key={key}>{key}</th>)}
                        {/* <th /> */}
                    </tr>
                </thead>
                <tbody>
                {!loading ? 
                    rows.length === 0 && 
                    <tr><td colSpan={keys.length + 1}>ไม่มีรายการเอกสาร</td></tr>:
                    <LoadingTable countRow={18} colSpan={8}/>
                }
                {isMock ? mockData.map(row => <RowRender key={row.id} {...row}/>) : rows.map(row => <RowRender key={row.id} {...row}/>)}
                {/* {rows.map(row => <RowRender key={row.id} {...row}/>)} */}
                </tbody>
            </Table>
        </Card>
    )
}


export default TableBase