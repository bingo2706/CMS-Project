import { Box, TextField, Autocomplete, Typography, useTheme, Stack, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/common/HeaderList';
import { useEffect, useState } from 'react';
import { useFetchAllcode } from '../../hooks/fetchAllcode';
import { useFetchAllUser } from '../../hooks/fetchAllUser';
import { createNewProject, getDetailProjectById, UpdateProjectService } from '../../services/projectService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { tokens } from '../../theme';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { toast } from 'react-toastify';
import { FORMAT, TYPE_ALLCODE } from '../../utils/constant';
import { useParams } from 'react-router-dom';
function AddProject() {
    const mdParser = new MarkdownIt();
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const { id } = useParams();
    const colors = tokens(theme.palette.mode);
    const [inputValues, setInputValues] = useState({
        name: '',
        statusId: '',
        contentMarkdown: '',
        contentHTML: '',
        startDate: '',
        endDate: '',
        statusProjectOptions: '',
        arrUser: [],
        isAddAction: true,
    });
    var { data: dataStatusProject } = useFetchAllcode(TYPE_ALLCODE.STATUSPROJECT);
    var { data: dataUser } = useFetchAllUser('', '', '', 0);

    useEffect(() => {
        if (id) {
            fetchDataProject(id);
        }
    }, [id]);
    let fetchDataProject = async (id) => {
        let res = await getDetailProjectById(id);
        if (res && res.errCode === 0) {
            let { data } = res;
            console.log(data);
            setInputValues({
                name: data.name,
                statusId: data.statusId,
                contentMarkdown: data.contentMarkdown,
                contentHTML: data.contentHTML,
                startDate: data.startDate,
                endDate: data.endDate,
                arrUser: data.userData,
                statusProjectOptions: data.statusId,
                isAddAction: false,
            });
        }
    };
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
        let arrUserId = inputValues.arrUser.map((item) => {
            return {
                userId: item.id,
            };
        });
        let objectData = {
            name: inputValues.name,
            statusId: inputValues.statusId,
            contentMarkdown: inputValues.contentMarkdown,
            contentHTML: inputValues.contentHTML,
            startDate: inputValues.startDate,
            endDate: inputValues.endDate,
            arrUserId: arrUserId,
            id: id,
        };
        if (inputValues.isAddAction) {
            let res = await createNewProject(objectData);
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
                    arrUser: [],
                    statusProjectOptions: '',
                });
            } else {
                toast.error(res.errMessage);
            }
        } else {
            let res = await UpdateProjectService(objectData);
            if (res && res.errCode === 0) {
                toast.success('Update project successfully !');
            } else {
                toast.error(res.errMessage);
            }
        }
    };

    return (
        <Box padding="20px 20px 40px 20px">
            <Header
                title={inputValues.isAddAction ? 'CREATE PROJECT' : 'UPDATE PROJECT'}
                subtitle={inputValues.isAddAction ? 'Create a New Project' : 'Update a Project'}
            />
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
                    value={inputValues.name}
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
                <Stack sx={{ gridColumn: 'span 2' }} spacing={3}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat={FORMAT.FORMAR_DATE}
                        value={inputValues.startDate}
                        name="startDate"
                        onChange={(value) => setInputValues({ ...inputValues, startDate: value['$d'] })}
                        renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} />}
                    />
                </Stack>
                <Stack sx={{ gridColumn: 'span 2' }} spacing={3}>
                    <DesktopDatePicker
                        label="End Date"
                        inputFormat={FORMAT.FORMAR_DATE}
                        value={inputValues.endDate}
                        name="endDate"
                        onChange={(value) => setInputValues({ ...inputValues, endDate: value['$d'] })}
                        renderInput={(params) => <TextField color="secondary" fullWidth variant="filled" {...params} />}
                    />
                </Stack>

                <Autocomplete
                    multiple
                    options={dataUser}
                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                    onChange={(event, newValue) => {
                        console.log(newValue);
                        setInputValues({
                            ...inputValues,
                            arrUser: newValue,
                        });
                    }}
                    value={inputValues.arrUser}
                    filterSelectedOptions
                    renderInput={(params) => <TextField color="secondary" fullWidth variant="outlined" {...params} label="Team member" />}
                    disablePortal
                    sx={{ gridColumn: 'span 4' }}
                />
                <Button onClick={() => handleCreateProject()} type="submit" color="secondary" variant="contained">
                    {inputValues.isAddAction ? 'CREATE NEW PROJECT' : 'UPDATE PROJECT'}
                </Button>
            </Box>
        </Box>
    );
}
export default AddProject;
