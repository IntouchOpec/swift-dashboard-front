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
        persissionName,
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
            <div className='col-1' />
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
            <div className='col-md-2 col-sm-2 mt-2 text-right float-right ml-auto'>
                {props.persissionName.create}
                <AuthContext.Consumer>{context => {
                    if (context.auth.is_superuser || context.auth.permissions.find(value => value === persissionName.create)) {
                        return <Link to={createPath}>
                            <Button className='w-100 text-center rounded-0 btn btn-warning float-right'> Create</Button>
                        </Link>
                    }
                }}
                </AuthContext.Consumer>
            </div>
        </div>
    )
}

export default Search