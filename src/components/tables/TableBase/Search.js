import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import SelectReact from 'components/forms/SelectReact'
import { Search as SearchIcon, Plus } from 'react-bootstrap-icons'
import { AuthContext } from 'providers'

const Search = props => {
    const {
        filterOptions,
        createPath,
        search,
        page,
        filter,
        pages,
        setSearch,
        searchHandler,
        onClickFilter,
        onClickPage,
    } = props
    return (
        <div className='row m-0 p-0'>
            <div className='col-md-3 col-sm-3 mt-2'>
                <div className='box-search-with-icon'>
                    <input
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchHandler()} value={search}
                        placeholder='Search' className='input-search form-control'
                    />
                    <SearchIcon className='icon-search' />
                </div>
            </div>
            <div className='col-md-2 col-sm-2 mt-2'>
                <SelectReact
                    isClearable
                    name=''
                    options={filterOptions}
                    onChange={onClickFilter}
                    value={filter}
                    placeholder='Filter'
                />
            </div>
            <div className='col-md-2 col-sm-2 mt-2'>
                <SelectReact
                    isClearable
                    name='page'
                    options={pages}
                    onChange={onClickPage}
                    value={page}
                    placeholder='page'
                />
            </div>
            <div className='col-2' />
            <div className='col-md-2 col-sm-2 mt-2'>
                <SelectReact
                    isClearable
                    name=''
                    options={[]}
                    onChange={() => { }}
                    value={{}}
                    placeholder='Filter'
                />
            </div>
            <div className='col-md-1 col-sm-1 mt-2 align-items-end text-right'>
                <AuthContext.Consumer>{context => {
                    if (context.auth.role !== "user") {
                        return <Link to={createPath}>
                            <Button className='text-center rounded-0 btn btn-warning'> Create</Button>
                        </Link>
                    }
                }}
                </AuthContext.Consumer>
            </div>
        </div>
    )
}

export default Search