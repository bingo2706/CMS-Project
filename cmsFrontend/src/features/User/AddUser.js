import { Box, Button, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/common/HeaderList';
import Autocomplete from '@mui/material/Autocomplete';
import { useFetchAllcode } from '../../hooks/fetchAllcode';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';
import CommonUtils from '../../utils/CommonUtils';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Lightbox from 'react-image-lightbox';

// import 'react-image-lightbox/style.css';
import { createNewUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { FORMAT, TYPE_ALLCODE } from '../../utils/constant';
function AddUser() {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    var { data: dataRole } = useFetchAllcode(TYPE_ALLCODE.ROLE);
    var { data: dataGender } = useFetchAllcode(TYPE_ALLCODE.GENDER);
    const [inputValues, setInputValues] = useState({
        image: '',
        imageReview: '',
        isOpen: false,
        firstName: '',
        lastName: '',
        email: '',
        phonenumber: '',
        genderId: '',
        roleId: '',
        password: '',
        date: new Date(),
        genderOptions: '',
        roleOptions: '',
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file.size > 31312281) {
            alert('Dung lượng file bé hơn 30mb');
        } else {
            console.log('file', file);
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setInputValues({ ...inputValues, image: base64, imageReview: objectUrl });
        }
    };
    let openPreviewImage = () => {
        console.log('click');
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, isOpen: true });
    };
    const handleSaveUser = async () => {
        try {
            let res = await createNewUser({
                email: inputValues.email,
                password: inputValues.password,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                roleId: inputValues.roleId,
                genderId: inputValues.genderId,
                phonenumber: inputValues.phonenumber,
                avatar: inputValues.image,
                dob: inputValues.date,
            });
            if (res && res.errCode === 0) {
                toast.success('Lưu người dùng thành công');
                setInputValues({
                    ...inputValues,
                    image: '',
                    imageReview: '',
                    isOpen: false,
                    firstName: '',
                    lastName: '',
                    email: '',
                    phonenumber: '',
                    genderId: '',
                    roleId: '',
                    password: '',
                    date: new Date(),
                    genderOptions: '',
                    roleOptions: '',
                });
            } else {
                toast.error(res.errMessage);
            }
        } catch (error) {
            toast.error(error.response.data.errMessage);
        }
    };
    return (
        <Box m="20px">
            <Header title="CREATE USER" subtitle="Create a New User Profile" />

            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                }}
            >
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onChange={(e) => handleOnChange(e)}
                    value={inputValues.firstName}
                    name="firstName"
                    color="secondary"
                    sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onChange={(e) => handleOnChange(e)}
                    value={inputValues.lastName}
                    name="lastName"
                    color="secondary"
                    sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onChange={(e) => handleOnChange(e)}
                    value={inputValues.email}
                    name="email"
                    color="secondary"
                    sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onChange={(e) => handleOnChange(e)}
                    value={inputValues.password}
                    name="password"
                    color="secondary"
                    sx={{ gridColumn: 'span 2' }}
                />

                <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                        setInputValues({ ...inputValues, genderId: newValue.value, genderOptions: newValue });
                    }}
                    value={inputValues.genderOptions}
                    options={dataGender}
                    sx={{ gridColumn: 'span 2' }}
                    renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} label="Gender" />}
                />
                <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                        setInputValues({ ...inputValues, roleId: newValue.value, roleOptions: newValue });
                    }}
                    value={inputValues.roleOptions}
                    options={dataRole}
                    sx={{ gridColumn: 'span 2' }}
                    renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} label="Role" />}
                />

                <Stack sx={{ gridColumn: 'span 2' }} spacing={3}>
                    <DesktopDatePicker
                        label="Date of birth"
                        inputFormat={FORMAT.FORMAR_DATE}
                        value={inputValues.date}
                        name="date"
                        onChange={(value) => setInputValues({ ...inputValues, date: value['$d'] })}
                        renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} />}
                    />
                </Stack>

                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Phonenumber"
                    onChange={(e) => handleOnChange(e)}
                    value={inputValues.phonenumber}
                    name="phonenumber"
                    color="secondary"
                    sx={{ gridColumn: 'span 2' }}
                />
            </Box>
            <Box display="flex" alignItems="flex-start" flexDirection="column" gap="10px" mt="10px">
                <span id="title">Avatar</span>
                <img
                    data-testid="imgReview"
                    onClick={() => openPreviewImage()}
                    src={inputValues.image}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer', borderRadius: 5 }}
                    alt="avatar"
                />
                <Box display={'flex'} gap="10px" alignItems={'center'}>
                    <Button variant="contained" component="label" color="secondary">
                        <PhotoCamera sx={{ marginRight: 1 }} />
                        Upload
                        <input hidden accept="image/*" onChange={(event) => handleOnChangeImage(event)} type="file" />
                    </Button>
                    <Button onClick={() => handleSaveUser()} type="submit" color="neutral" variant="contained">
                        Create New User
                    </Button>
                </Box>
            </Box>

            {inputValues.isOpen === true && (
                <Lightbox
                    data-testid="Lightbox"
                    mainSrc={inputValues.imageReview}
                    onCloseRequest={() => setInputValues({ ...inputValues, isOpen: false })}
                />
            )}
        </Box>
    );
}

export default AddUser;
