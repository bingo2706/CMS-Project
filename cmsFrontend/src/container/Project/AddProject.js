import { Box, TextField, Autocomplete, Typography, useTheme, Stack, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useState } from 'react';
import { useFetchAllcode } from '../../container/customize/fetchAllcode';
import { useFetchAllUser } from '../../container/customize/fetchAllUser';
import { createNewProject } from '../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { tokens } from '../../theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { toast } from 'react-toastify';
export default function AddProject() {
    const mdParser = new MarkdownIt();
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [inputValues, setInputValues] = useState({
        name: '',
        statusId: '',
        contentMarkdown: '',
        contentHTML: '',
        startDate: '',
        endDate: '',
        arrUserId: [],
        statusProjectOptions: '',
    });
    var { data: dataStatusProject } = useFetchAllcode('STATUSPROJECT');
    var { data: dataUser } = useFetchAllUser('', '', '', 0);
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    let handleEditorChange = ({ html, text }) => {
        setInputValues({
            ...inputValues,
            contentMarkdown: text,
            contentHTML: html,
        });
    };
    const handleCreateProject = async () => {
        console.log('inputValues', inputValues);
        let res = await createNewProject({
            name: inputValues.name,
            statusId: inputValues.statusId,
            contentMarkdown: inputValues.contentMarkdown,
            contentHTML: inputValues.contentHTML,
            startDate: inputValues.startDate,
            endDate: inputValues.endDate,
            arrUserId: inputValues.arrUserId,
        });
        if (res && res.errCode === 0) {
            toast.success('Create new project successfully !');
            setInputValues({
                ...inputValues,
                name: '',
                statusId: '',
                contentMarkdown: '',
                contentHTML: '',
                startDate: '',
                endDate: '',
                arrUserId: [],
                statusProjectOptions: '',
            });
        } else {
            toast.error(res.errMessage);
        }
    };
    return (
        <Box padding="20px 20px 40px 20px">
            <Header title="CREATE PROJECT" subtitle="Create a New Project" />
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
                    label="Name"
                    onChange={(e) => handleOnChange(e)}
                    value={inputValues.firstName}
                    name="name"
                    color="secondary"
                    sx={{ gridColumn: 'span 2' }}
                />
                <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                        setInputValues({ ...inputValues, statusId: newValue.value, statusProjectOptions: newValue });
                    }}
                    value={inputValues.statusProjectOptions}
                    options={dataStatusProject}
                    sx={{ gridColumn: 'span 2' }}
                    renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} label="Status" />}
                />
                <Box sx={{ gridColumn: 'span 4' }}>
                    <Typography variant="h5" fontWeight={600} mb={1} color={colors.grey[100]}>
                        Description project
                    </Typography>
                    <MdEditor
                        style={{ height: '50vh' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={inputValues.contentMarkdown}
                    />
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack sx={{ gridColumn: 'span 2' }} spacing={3}>
                        <DesktopDatePicker
                            label="Start Date"
                            inputFormat="MM/DD/YYYY"
                            value={inputValues.startDate}
                            name="startDate"
                            onChange={(value) => setInputValues({ ...inputValues, startDate: value['$d'] })}
                            renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} />}
                        />
                    </Stack>
                    <Stack sx={{ gridColumn: 'span 2' }} spacing={3}>
                        <DesktopDatePicker
                            label="End Date"
                            inputFormat="MM/DD/YYYY"
                            value={inputValues.endDate}
                            name="endDate"
                            onChange={(value) => setInputValues({ ...inputValues, endDate: value['$d'] })}
                            renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>

                <Autocomplete
                    multiple
                    options={dataUser}
                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                    onChange={(event, newValue) => {
                        setInputValues({
                            ...inputValues,
                            arrUserId: newValue.map((item) => {
                                return { userId: item.id };
                            }),
                        });
                    }}
                    filterSelectedOptions
                    renderInput={(params) => <TextField color="secondary" fullWidth variant="outlined" {...params} label="Team member" />}
                    disablePortal
                    sx={{ gridColumn: 'span 4' }}
                />
                <Button onClick={() => handleCreateProject()} type="submit" color="secondary" variant="contained">
                    CREATE NEW PROJECT
                </Button>
            </Box>
        </Box>
    );
}
