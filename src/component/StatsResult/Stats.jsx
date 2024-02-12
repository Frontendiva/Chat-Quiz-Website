import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const StatsPageWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
`;

const StatsTitle = styled.h1`
  color: #fff;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  max-width: 600px;
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  background-color: #22d1ee;
  color: #fff;
  padding: 10px;
  border: 1px solid #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const TableCell = styled.td`
  color: #fff;
  padding: 8px;
  border: 1px solid #fff;
  text-align: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #22d1ee;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1daed9;
  }
`;

const StatsPage = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const resultsRef = collection(firestore, "quizResults");
      const q = query(resultsRef, orderBy("correctAnswersCount", "desc"));
      const querySnapshot = await getDocs(q);
      const resultsArray = querySnapshot.docs.map(doc => ({
        userName: doc.data().userName || "Аноним",
        correctAnswersCount: doc.data().correctAnswersCount
      }));
      setResults(resultsArray);
    };

    fetchResults();
  }, []);

  return (
    <StatsPageWrapper>
      <StatsTitle>Результаты викторины</StatsTitle>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Имя игрока</TableHeader>
            <TableHeader>Результат</TableHeader>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.userName}</TableCell>
              <TableCell>{result.correctAnswersCount} правильных ответов</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      <Button onClick={() => navigate('/themeSelection')}>Выбрать другую викторину</Button>
      <Button onClick={() => navigate('/readyForQuiz')}>Вернуться на главную</Button>
    </StatsPageWrapper>
  );
};

export default StatsPage;
