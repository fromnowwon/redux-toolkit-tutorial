import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { editUser } from "./userSlice"

const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector(store => store.users);
  const navigate = useNavigate();
  const existingUser = users.filter(user => user.id === params.id);
  console.log("existingUser", existingUser)
  const { name, email } = existingUser[0];
  const [values, setValues] = useState({
    name: name,
    email: email,
  });

  const handleEditUser = () => {
    setValues({ name: '', email: '' })
    dispatch(editUser({
      id: params.id,
      name: values.name,
      email: values.email
    }))
    navigate('/')
  }

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Name"
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'John doe' }}
      />
      <br />
      <TextField
        label="email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        inputProps={{ type: 'email', placeholder: 'johndoe@email.com' }}
      />
      <Button onClick={handleEditUser}>Edit</Button>
    </div>
  )
}

export default EditUser