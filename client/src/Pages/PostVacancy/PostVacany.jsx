import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Input, ButtonComp, Error } from "../../components";
import { useSelector } from "react-redux";
import {
  useCreateVacancyMutation,
  useGetMasterDataQuery,
} from "../../state/api";
import userHasPermission from "../../permissions";
import VacancyDocuments from "./VacancyDocuments";

const initState = {
  VacancyName: "",
  RecruitmentType: "",
  SalaryGroupId: "",
  BoardGradeId: "",
  PublishedDate: Date().toString(),
  ClosingDate: null,
  NoOfVacancies: 1,
  PlannedInterViewDate: null,
  AgeLimit: 45,
  Remarks: "",
  ExpectedNoOfApplicants: 1,
  AdvertismentPath: "",
  Status: "PENDING",
};

const PostVacancy = ({ isEditing, setIsEditing, editingVacancy }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [setActive] = useOutletContext();
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState();
  const [createVacancy, { isLoading }] = useCreateVacancyMutation();
  const { UserId, UserRole } = useSelector(
    (state) => state.userContext.data.result
  );
  const { data: masterData, isLoading: masterDataIsLoading } =
    useGetMasterDataQuery();
  const [vacancy, setVacancy] = useState({
    ...initState,
    userId: UserId,
  });

  const recruitmentOptions = [
    { text: "Internal Recruitment", value: "INT" },
    { text: "External Recruitment", value: "EXT" },
    { text: "Promotion Recruitment", value: "PRO" },
    {
      text: "Internal and External Recruitment",
      value: "INT_EXT",
    },
  ];
  const statusOptions = [
    { text: "Active", value: "ACT" },
    { text: "Inactive", value: "INA" },
    { text: "Pending", value: "PENDING" },
  ];

  useEffect(() => setActive("2"), [setActive]);

  useEffect(() => {
    editingVacancy &&
      setVacancy({
        ...editingVacancy,
        RecruitmentType: recruitmentOptions.find(
          (v) => v.text === editingVacancy.RecruitmentType
        ).value,
        Status:
          editingVacancy.Status === "Open"
            ? "ACT"
            : editingVacancy.Status === "Close"
            ? "INA"
            : "PENDING",
      });
    // eslint-disable-next-line
  }, [editingVacancy]);

  const handleChange = (e) => {
    setVacancy({
      ...vacancy,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createVacancy({
      createReq: vacancy,
      attachment: attachment,
    });
    if (result.error) {
      setError(result.error?.data?.message);
    } else {
      isEditing ? handleCancel() : navigate("/vacancies");
    }
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.main,
        pb: "3rem",
      }}
    >
      <Container maxWidth="lg">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              mt: "1rem",
            }}
          >
            {isEditing ? "Edit" : "Define"} Vacancy for Recruitment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={3} sx={{ m: "1rem auto" }}>
              <Grid item xs={12}>
                <Typography>
                  Select the post and {isEditing ? "edit" : "define"} details
                  regarding the vacancy.
                </Typography>
              </Grid>
            </Grid>
            <div style={{ display: "flex" }}>
              <Container maxWidth="md">
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: "2rem 3vw",
                    width: "100%",
                  }}
                >
                  <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          mb: "1rem",
                        }}
                      >
                        {vacancy.RecruitmentType &&
                          recruitmentOptions.find(
                            (v) => v.value === vacancy.RecruitmentType
                          ).text + " to : "}
                        <span
                          style={{
                            color: theme.palette.primary[500],
                          }}
                        >
                          {vacancy.VacancyName}
                        </span>
                      </Typography>
                    </Grid>
                    <Input
                      name="VacancyName"
                      value={vacancy.VacancyName}
                      handleChange={handleChange}
                      label="Vacancy :"
                      required
                      inline
                    />
                    <Input
                      name="RecruitmentType"
                      type="select"
                      options={recruitmentOptions}
                      value={vacancy.RecruitmentType}
                      handleChange={handleChange}
                      label="Recruitment Method :"
                      required
                      inline
                    />
                    <Input
                      name="ClosingDate"
                      type="date"
                      value={vacancy.ClosingDate}
                      handleChange={handleChange}
                      label="Closing Date of Application :"
                      required
                      inline
                    />
                    <Input
                      name="PlannedInterViewDate"
                      type="date"
                      value={vacancy.PlannedInterViewDate}
                      handleChange={handleChange}
                      label="Expected Date of Interview :"
                      required
                      inline
                    />
                    <Input
                      type="number"
                      name="NoOfVacancies"
                      label="No. of Vacancies :"
                      value={vacancy.NoOfVacancies}
                      handleChange={handleChange}
                      inline
                      required
                    />
                    <Input
                      type="number"
                      name="AgeLimit"
                      label="Age Limit :"
                      value={vacancy.AgeLimit}
                      handleChange={handleChange}
                      inline
                      required
                    />
                    <Input
                      name="AdvertismentPath"
                      label="Advertisment :"
                      value={vacancy.AdvertismentPath}
                      setAttachment={setAttachment}
                      type="file"
                      handleChange={handleChange}
                      inline
                    />
                    <Input
                      name="Remarks"
                      label="Remarks :"
                      value={vacancy.Remarks}
                      handleChange={handleChange}
                      size="medium"
                      multiline
                      inline
                      minRows={5}
                      maxRows={8}
                    />
                    {userHasPermission({
                      userRole: UserRole,
                      permission: "Approve Vacancy",
                    }) && (
                      <Input
                        name="Status"
                        label="Status :"
                        type="select"
                        value={vacancy.Status}
                        handleChange={handleChange}
                        options={statusOptions}
                        disabled={vacancy.NoOfApplicants > 0 ? true : false}
                        inline
                        required
                      />
                    )}
                    <Grid item xs={12}>
                      <hr />
                    </Grid>
                    <Input
                      name="SalaryGroupId"
                      label="Salary Group :"
                      type="select"
                      value={vacancy.SalaryGroupId}
                      handleChange={handleChange}
                      options={masterData?.data?.salaryGroups}
                      loading={masterDataIsLoading}
                      autocomplete
                      inline
                      required
                    />
                    <Input
                      name="BoardGradeId"
                      label="Board Grade :"
                      type="select"
                      options={masterData?.data?.boardGrades}
                      loading={masterDataIsLoading}
                      value={vacancy.BoardGradeId}
                      handleChange={handleChange}
                      autocomplete
                      inline
                      required
                    />
                    <Grid item xs={12}>
                      {!isEditing ? (
                        <ButtonComp
                          type="submit"
                          loading={isLoading}
                          sx={{
                            mt: "2rem",
                            p: "1rem ",
                          }}
                          align="right"
                        >
                          Post Vacancy
                        </ButtonComp>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            gap: "10px",
                          }}
                        >
                          <ButtonComp onClick={handleCancel}>Cancel</ButtonComp>
                          <ButtonComp type="submit" loading={isLoading}>
                            Save
                          </ButtonComp>
                        </div>
                      )}
                    </Grid>
                    <Error error={error} setError={setError} />
                  </Grid>
                </Paper>
              </Container>
              {isEditing && (
                <VacancyDocuments
                  vacancy={{
                    VacancyId: vacancy.VacancyId,
                    AdvertisementPath: vacancy?.AdvertismentPath,
                  }}
                />
              )}
            </div>
          </form>
        </div>
      </Container>
    </Box>
  );
};

export default PostVacancy;
