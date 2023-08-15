import React, { useState } from 'react';
import styled from 'styled-components';

const ScholarshipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
  color: #1da1f2;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const CategoryItem = styled.li`
  list-style: none;
  margin: 0 10px;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  cursor: pointer;
`;

const SearchContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ScholarshipList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScholarshipItem = styled.div`
  text-align: center;
  margin-bottom: 20px;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 30px;
`;

const ScholarshipTitle = styled.h3`
  margin-bottom: 10px;
  color: #333333;
`;

const ScholarshipDescription = styled.p`
  margin-bottom: 10px;
  color: #333333;
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  background-color: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0c85d0;
  }
`;

const Separator = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

const Scholarship = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredScholarships = scholarshipData
    .filter(
      scholarship => scholarship.category === selectedCategory || selectedCategory === 'all'
    )
    .filter(scholarship =>
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <ScholarshipContainer>
      <Heading>Scholarship</Heading>

      <CategoryContainer>
        <CategoryItem
          selected={selectedCategory === 'all'}
          onClick={() => handleCategoryChange('all')}
        >
          All
        </CategoryItem>
        <CategoryItem
          selected={selectedCategory === 'government'}
          onClick={() => handleCategoryChange('government')}
        >
          Government Scholarships
        </CategoryItem>
        <CategoryItem
          selected={selectedCategory === 'tertiary'}
          onClick={() => handleCategoryChange('tertiary')}
        >
          Scholarships by Tertiary Institutions
        </CategoryItem>
        <CategoryItem
          selected={selectedCategory === 'independent'}
          onClick={() => handleCategoryChange('independent')}
        >
          Independent Body Scholarships
        </CategoryItem>
      </CategoryContainer>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search Scholarships"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>

      <ScholarshipList>
        {filteredScholarships.map((scholarship, index) => (
          <React.Fragment key={scholarship.id}>
            <ScholarshipItem>
              <ScholarshipTitle>{scholarship.name}</ScholarshipTitle>
              <ScholarshipDescription>{scholarship.description}</ScholarshipDescription>
              <ApplyButton>Apply</ApplyButton>
            </ScholarshipItem>
            {index !== filteredScholarships.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </ScholarshipList>
    </ScholarshipContainer>
  );
};

const scholarshipData = [
  {
    id: 1,
    name: 'Scholarship 1',
    category: 'government',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Scholarship 2',
    category: 'tertiary',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'Scholarship 3',
    category: 'independent',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  // Add more scholarships...
];

export default Scholarship;
