import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import SelectField from 'components/forms/SelectField'
import { Search as SearchIcon, Plus } from 'react-bootstrap-icons'

const Search = props => {
    const {
        filterOptions,
        createPath,
        search,
        page,
        pages,
        setSearch,
        searchHandler,
        onClickFilter,
        onClickPage,
    } = props
    return (
        <div className='d-flex'>
            <div className="col-md-3 col-sm-3 mt-2">
                <div className="box-search-with-icon">
                    <input 
                        // onChange={e => setSearch(e.target.value)} 
                        // onKeyDown={(e) => e.key === 'Enter' && searchHandler()} value={search} 
                        placeholder="Search" className="input-search form-control"
                        />
                    <SearchIcon className="icon-search"/>
                </div>
            </div>
            <div className="col-md-2 col-sm-2 mt-2">
                <SelectField 
                    isClearable
                    name=''
                    options={filterOptions}
                    onChange={() => {}}
                    value={{}}
                    placeholder="Filter"
                />
            </div>
            <div className="col-md-2 col-sm-2 mt-2">
                <SelectField 
                    isClearable
                    name=''
                    options={[]}
                    onChange={() => {}}
                    value={{}}
                    placeholder="Filter"
                />
            </div>
            <div className='col-2'/>
            <div className='col-md-2 col-sm-2 mt-2'>
                <SelectField 
                    isClearable
                    name=''
                    options={[]}
                    onChange={() => {}}
                    value={{}}
                    placeholder="Filter"
                />
            </div>
            <div className='col-md-2 col-sm-2 mt-2'>
                <Link to={createPath}>
                    <Button className='mr-4 text-center rounded-0 btn btn-warning'> <Plus/> Create</Button>
                </Link>
            </div>
        </div>
    )
}

export default Search