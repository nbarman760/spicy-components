import React, { useState, useEffect } from "react";
import "./styles.css";
import ContextMenu from "./ContextMenu";

const defaultProps = {
    data: [],
    columns: [],
    clickAddHandle: () => { }
};
const DataTable = ({
    data,
    columns,
    onEdit,
    onDelete,
    clickAddHandle,
    statusChange,
    onItemSelected
}) => {
    const [tableData, setTableData] = useState(data);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({
        top: 0,
        left: 0
    });
    const [targetItem, setTargetItem] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    const itemsPerPage = 10;
    useEffect(() => {
        setTableData(data); // Update the tableData when data prop changes
    }, [data]);

    useEffect(() => {
        const sortedData = [...data];
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        const toggleSelectAll = () => {
            if (selectedItems.length === tableData.length) {
                // Deselect all items if all are selected
                setSelectedItems([]);
            } else {
                // Select all items
                setSelectedItems(tableData.map((item) => item)); // You can use a unique identifier as well
            }
            onItemSelected(selectedItems)
        };

        const filteredData = sortedData.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setCurrentPage(0);
        setTableData(filteredData);
    }, [sortConfig, searchTerm]);

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleContextMenu = (e, item) => {
        e.preventDefault();
        setTargetItem(item);
        setContextMenuPosition({ top: e.clientY, left: e.clientX });
        setContextMenuVisible(true);
    };

    const closeContextMenu = () => {
        setContextMenuVisible(false);
    };

    const handleDelete = () => {
        onDelete(targetItem);
    };
    const handleEdit = () => {
        onEdit(targetItem);
    };

    const isSelected = (item) => selectedItems.includes(item);

    const toggleSelectAll = () => {
        if (selectedItems.length === tableData.length) {
            // Deselect all items if all are selected
            setSelectedItems([]);
        } else {
            // Select all items
            setSelectedItems(tableData.map((item) => item)); // You can use a unique identifier as well
        }
        onItemSelected(selectedItems)
    };

    const toggleSelectItem = (item) => {
        if (isSelected(item)) {
            // Deselect the item
            setSelectedItems(selectedItems.filter((selected) => selected !== item));
        } else {
            // Select the item
            setSelectedItems([...selectedItems, item]);
        }
        onItemSelected(selectedItems)
    };
    const customCheckboxStyle = {
        display: "inline-block",
        width: "20px",
        height: "20px",
        backgroundColor: "white",
        border: "2px solid #999",
        borderRadius: "3px",
        marginRight: "10px"
    };

    const renderTableData = () => {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const currentData = tableData.slice(start, end);

        return currentData.map((item, index) => (
            <tr
                key={index}
                onContextMenu={($event) => handleContextMenu($event, item)}
            >
                <td>
                    <input
                        style={customCheckboxStyle}
                        type="checkbox"
                        onChange={() => toggleSelectItem(item)}
                        checked={isSelected(item)}
                    />
                </td>

                {columns.map((col) => (
                    <td key={col.key}>
                        {col.displayFunction ? (
                            <span innerHTML={col.displayFunction(item[col.key])}></span>
                        ) : (
                            item[col.key]
                        )}
                    </td>
                ))}
            </tr>
        ));
    };

    const renderTableHeader = () => (
        <tr>
            <th>
                <input
                    style={customCheckboxStyle}
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selectedItems.length === tableData.length}
                />
            </th>
            {columns.map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)}>
                    {col.name}
                    {sortConfig.key === col.key && (
                        <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                    )}
                </th>
            ))}
        </tr>
    );

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
        );
    };

    const handleStatusChange = (e) => {
        statusChange(e);
    };

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
                <div className="search-box">
                    <select
                        id="dropdown"
                        name="status"
                        onChange={(e) => handleStatusChange(e)}
                    >
                        <option value="active">Active</option>
                        <option value="delete">Deleted</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <div className="table-tools-right">
                    {/* <button className="download-button" title="Download As Excel">

                    </button> */}
                    <button className="add-row-button" onClick={clickAddHandle}>
                        Add New
                    </button>
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
            <table className="table">
                <thead>{renderTableHeader()}</thead>
                <tbody>{renderTableData()}</tbody>
            </table>
            {contextMenuVisible && (
                <ContextMenu
                    top={contextMenuPosition.top}
                    left={contextMenuPosition.left}
                    onClose={closeContextMenu}
                    onEdit={() => {
                        handleEdit();
                        closeContextMenu();
                    }}
                    onDelete={() => {
                        handleDelete();
                        closeContextMenu();
                    }}
                />
            )}
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
