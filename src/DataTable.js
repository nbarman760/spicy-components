import React, { useState, useEffect } from 'react';
import './style.css'
import ContextMenu from './ContextMenu';

const defaultProps = {
    data: [],
    columns: [],
    clickAddHandle: () => {

    }
}
const DataTable = (props) => {
    props = { ...defaultProps, ...props }
    const { data, columns, onEdit, onDelete } = props;
    const [tableData, setTableData] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const itemsPerPage = 10;

    useEffect(() => {
        const sortedData = [...data];
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        const filteredData = sortedData.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setCurrentPage(0);
        setTableData(filteredData);
    }, [sortConfig, searchTerm]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenuPosition({ top: e.clientY, left: e.clientX });
        setContextMenuVisible(true);
    };

    const closeContextMenu = () => {
        setContextMenuVisible(false);
    };


    const renderTableData = () => {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const currentData = tableData.slice(start, end);

        return currentData.map((item, index) => (
            <tr key={index} onContextMenu={handleContextMenu}>
                {columns.map((col) => (
                    <td key={col.key}>{col.displayFunction ? col.displayFunction(item[col.key]) : item[col.key]}</td>
                ))}
                {contextMenuVisible && (
                    <ContextMenu
                        top={contextMenuPosition.top}
                        left={contextMenuPosition.left}
                        onClose={closeContextMenu}
                        onEdit={() => {
                            onEdit(item.id);
                            closeContextMenu();
                        }}
                        onDelete={() => {
                            onDelete(item.id);
                            closeContextMenu();
                        }}
                    />
                )}
            </tr>
        ));
    };





    const renderTableHeader = () => (
        <tr>
            {
                columns.map((col) => (
                    <th key={col.key} onClick={() => handleSort(col.key)}>
                        {col.name}
                        {sortConfig.key === col.key && (<span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>)
                        }
                    </th>
                ))
            }
        </tr>
    )


    const pageCount = Math.ceil(tableData.length / itemsPerPage);
    const pages = new Array(pageCount).fill(null).map((_, i) => i);
    const pagination = () => {
        return (
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(0)}
                    disabled={currentPage === 0}
                >
                    &lt;&lt;
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    &lt;
                </button>
                <span>
                    Page {currentPage + 1} of {pageCount}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageCount - 1}
                >
                    &gt;
                </button>
                <button
                    onClick={() => handlePageChange(pageCount - 1)}
                    disabled={currentPage === pageCount - 1}
                >
                    &gt;&gt;
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="table-tools">
                <div className="search-box">
                    <i className="search-icon">🔍</i>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="table-tools-right">
                    <button className="download-button">Download Excel</button>
                    <button className="add-row-button" onClick={props.clickAddHandle}>Add Row</button>
                    <div className="more-actions">
                        <button className="more-actions-button">More Actions</button>
                        <div className="more-actions-dropdown">
                            <button>Option 1</button>
                            <button>Option 2</button>
                            <button>Option 3</button>
                        </div>
                    </div>
                </div>
            </div>
            <table className='table'>
                <thead>{renderTableHeader()}</thead>
                <tbody>{renderTableData()}</tbody>
            </table>
            <div className="pagination">
                {pagination()}
                {/* {pages.map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)}>
                        {page + 1}
                    </button>
                ))} */}
            </div>
        </div>
    );
};

export default DataTable;
