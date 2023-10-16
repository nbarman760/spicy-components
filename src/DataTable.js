import React, { useState, useEffect } from 'react';

const DataTable = ({ data, columns }) => {
    const [tableData, setTableData] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
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

    const renderTableData = () => {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const currentData = tableData.slice(start, end);

        return currentData.map((item, index) => (
            <tr key={index}>
                {columns.map((col) => (
                    <td key={col.key}>{item[col.key]}</td>
                ))}
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

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <table>
                <thead>{renderTableHeader()}</thead>
                <tbody>{renderTableData()}</tbody>
            </table>
            <div className="pagination">
                {pages.map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)}>
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DataTable;
