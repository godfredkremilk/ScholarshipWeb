import React, { useState } from 'react';
import styled from 'styled-components';

const ScholarshipListContainer = styled.div`
  position: fixed;
  width: 250px;
  background-color: #f9fafb;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow-y: auto;
  max-height: calc(100vh - 140px);
  margin-right: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const ScholarshipListHeading = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #0a66c2;
`;

const ScholarshipListWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const ScholarshipItem = styled.div`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ScholarshipName = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333333;
`;

const ScholarshipDueDate = styled.div`
  color: #555555;
  font-size: 12px;
  margin-bottom: 5px;
`;

const ApplyNowButton = styled.button`
  background-color: #0a66c2;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #084e8a;
  }
`;

const ShowMoreLink = styled.div`
  color: #0a66c2;
  cursor: pointer;
  text-decoration: underline;
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
`;

const ScholarshipList = () => {
  const initialScholarships = [
    {
      name: 'Scholarship 1',
      dueDate: 'June 30, 2023',
    },
    {
      name: 'Scholarship 2',
      dueDate: 'July 15, 2023',
    },
    {
      name: 'Scholarship 3',
      dueDate: 'August 10, 2023',
    },
    {
      name: 'Scholarship 4',
      dueDate: 'September 1, 2023',
    },
    {
      name: 'Scholarship 5',
      dueDate: 'October 15, 2023',
    },
  ];

  const [scholarships] = useState(initialScholarships);
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <ScholarshipListContainer>
      <ScholarshipListHeading>Scholarship List</ScholarshipListHeading>
      <ScholarshipListWrapper>
        {scholarships.slice(0, showAll ? scholarships.length : 3).map((scholarship, index) => (
          <ScholarshipItem key={index}>
            <ScholarshipName>{scholarship.name}</ScholarshipName>
            <ScholarshipDueDate>Due Date: {scholarship.dueDate}</ScholarshipDueDate>
            <ApplyNowButton>Apply Now</ApplyNowButton>
          </ScholarshipItem>
        ))}
      </ScholarshipListWrapper>
      {!showAll && scholarships.length > 3 && (
        <ShowMoreLink onClick={toggleShowAll}>Show More</ShowMoreLink>
      )}
    </ScholarshipListContainer>
  );
};

export default ScholarshipList;
