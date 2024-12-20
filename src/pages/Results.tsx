import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const [quizResult, setQuizResult] = useState(null);

  // useEffect(() => {
  //   const fetchResult = async () => {
  //     const { userId } = location.state;
  //     try {
  //       const response = await axios.get(`/api/quiz/results/${userId}`);
  //       setQuizResult(response.data);
  //     } catch (error) {
  //       console.error("Error fetching quiz result:", error);
  //     }
  //   };

  //   fetchResult();
  // }, [location.state]);

  return (
    <PageContainer title="Your personal results">
      <Card>
        <CardHeader title="Results from this session" />
        <CardContent>
          <Typography>Hi</Typography>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
