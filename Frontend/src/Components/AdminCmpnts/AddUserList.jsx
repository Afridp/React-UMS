import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import { addUserDetails } from "../../Api/adminApi";

const AddUserList = () => {
  const [value, setValue] = useState({
    name: null,
    email: null,
    number: null,
    password: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (value.name.trim() === "") {
        toast("please enter your email");
      } else if (value.number.trim() === "") {
        toast("pleas enter your number ");
      } else if (value.email.trim() === "") {
        toast("pleace enter your email");
      } else if (value.password.trim() === "") {
        toast("pleace enter your password");
      } else if (/\s/.test(value.name) || /\s/.test(value.number) || /\s/.test(value.email)) {
        toast("Fields should not contain spaces");
      } else {
        const response = await addUserDetails(value);
        if (response.data.status) {
          navigate("/admin/dashboard");
        } else {
          toast(response.data.alert);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center pt-4">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add user details
        </Typography>
        <form
          onClick={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="name"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Name"
            />
            <Input
              name="number"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Number"
            />
            <Input
              name="email"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Email"
            />
            <Input
              name="password"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              type="password"
              size="lg"
              label="Password"
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Submit
          </Button>
          <ToastContainer />
        </form>
      </Card>
    </div>
  );
};

export default AddUserList;
