import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import {
  deleteFormData,
  getFormData,
  getSingleFormData,
  getUserForms,
} from "../../toolkit/slices/formSlice";
import { useSelector } from "react-redux";
import {
  allUsers,
  deleteUserData,
  setProgress,
} from "../../toolkit/slices/authSlice";
import { BiEdit, BiUserCircle } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import {
  getDesignData,
  getUserDesginData,
} from "../../toolkit/slices/designSlice";
import {
  getPersonalData,
  getUserPersonalData,
} from "../../toolkit/slices/personalSlice";
import Modal from "./Modal";
import FormModal from "./FormModal";
import UserModal from "./UserModal";
import { useReactToPrint } from "react-to-print";

const Datagrid = ({ selectForms }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile);
  const { data, submitted, search } = useSelector((state) => state.form);
  const { users, updateUi } = useSelector((state) => state.auth);
  const login = localStorage.getItem("firstLogin");
  const [filteredData, setFilteredData] = useState(data);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [formDeleted, setFormDeleted] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [modal, setModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [userData, setUserData] = useState({});
  const reference = useRef()

  const deleteForm = (id) => {
    dispatch(setProgress(40));
    setFilteredData(data.filter((item) => item._id !== id));
    dispatch(deleteFormData(id)).then(()=> {
      setFormDeleted(true);
      dispatch(setProgress(100));
    })
  };

  const deleteUser = (id) => {
    dispatch(setProgress(40));
    setFilteredUsers(users.filter((item) => item._id !== id));
    dispatch(deleteUserData(id)).then(()=> {
      setUserDeleted(true);
      dispatch(setProgress(100));
    })
  };

  useEffect(() => {
    if (profileData.role === "manager" || profileData.role === "admin") {
      if (search.length > 0) {
        setFilteredUsers(
          users?.filter((item) => {
            if (item._id === profileData._id) {
              return;
            }
            return item.email.toLowerCase().includes(search.toLowerCase());
          })
        );
      }
    }
    if (profileData.role === "manager" || profileData.role === "user") {
      if (search.length > 0) {
        setFilteredData(
          data?.filter((item) =>
            item.email.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }
  }, [search, userDeleted, formDeleted]);

  const generatePdf = (id) => {
    data.forEach((item) => {
      if (item._id === id) {
        dispatch(setProgress(40));
        dispatch(getDesignData());
        dispatch(getPersonalData());
        dispatch(getSingleFormData(id)).then(() => {
          setFormModal(true);
          dispatch(setProgress(100));
        });
      }
    });
  };

  const handleChange = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  useEffect(() => {
    dispatch(getFormData());
  }, [dispatch, submitted, formDeleted]);

  useEffect(() => {
    dispatch(setProgress(20));
    dispatch(allUsers()).then(() => {
      dispatch(setProgress(100));
    });
  }, [dispatch, login, userDeleted, userModal, updateUi]);

  const formColumns = [
    {
      name: "Name",
      selector: (row) => (
        <>
          {row.firstName} {row.lastName}
        </>
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: "Mobile No.",
      selector: (row) => row.mobileNo,
      sortable: true,
    },
    {
      name: "Type of form",
      selector: (row) => row.typeOfForm,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.selectOptions,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button>
            <MdOutlinePreview size={20} onClick={() => generatePdf(row._id)} />
          </button>
          <button onClick={() => deleteForm(row._id)}>
            <AiOutlineDelete size={20} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const editRole = (id) => {
    dispatch(setProgress(40));
    users.forEach((item) => {
      if (item._id === id) {
        setUserData(item);
        setUserModal(true);
        dispatch(setProgress(100));
      }
    });
  };

  const previewForms = (id) => {
    dispatch(setProgress(40));
    dispatch(getUserDesginData(id));
    dispatch(getUserPersonalData(id));
    dispatch(getUserForms(id)).then(() => {
      setModal(true);
      dispatch(setProgress(100));
    });
  };

  const handlePrint = useReactToPrint({
    content: ()=> reference.current,
    documentTitle: "form"
  })


  const userColumns = [
    {
      name: "Name",
      selector: (row) => (
        <div className="flex items-center justify-center gap-4 py-3">
          <span className="rounded-full h-max w-12 object-contain">
            {row.image?.length > 0 ? (
              <img src={row.image} className="rounded-full" alt="" />
            ) : (
              <BiUserCircle
                className="h-max w-12 text-gray-300"
                aria-hidden="true"
              />
            )}
          </span>
          {row.firstName} {row.lastName}
        </div>
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    profileData.role === "admin" && {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => editRole(row._id)}>
            <BiEdit size={20} />
          </button>
          <button onClick={() => previewForms(row._id)}>
            <MdOutlinePreview size={20} />
          </button>
          <button onClick={() => deleteUser(row._id)}>
            <AiOutlineDelete size={20} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      {userModal && (
        <UserModal setUserModal={setUserModal} userData={userData} />
      )}
      {formModal && <FormModal setFormModal={setFormModal} reference={reference} handlePrint={handlePrint} />}
      {modal && <Modal setModal={setModal} setFormModal={setFormModal} />}
      {profileData.role === "admin" && (
        <DataTable
          title="Users"
          pagination
          noHeader
          data={search?.length > 0 ? filteredUsers : users}
          columns={userColumns}
          selectableRows
          onSelectedRowsChange={handleChange}
        />
      )}
      {profileData.role === "manager" && (
        <DataTable
          title="Forms & Users"
          pagination
          noHeader
          data={
            selectForms
              ? search?.length > 0
                ? filteredData
                : data
              : search?.lenght > 0
              ? filteredUsers
              : users
          }
          columns={selectForms ? formColumns : userColumns}
          selectableRows
          onSelectedRowsChange={handleChange}
        />
      )}
      {profileData.role === "user" && (
        <DataTable
          title="Forms"
          pagination
          noHeader
          data={search?.length > 0 ? filteredData : data}
          columns={formColumns}
          selectableRows
          onSelectedRowsChange={handleChange}
        />
      )}
    </>
  );
};

export default Datagrid;
