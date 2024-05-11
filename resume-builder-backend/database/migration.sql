CREATE table header (id int PRIMARY KEY, 
firstName VARCHAR, 
lastName VARCHAR, 
catchyHeadline VARCHAR,
locationCityState VARCHAR, 
phoneNumber VARCHAR);



CREATE table education (id INTEGER PRIMARY KEY, 
universityName VARCHAR, 
degree VARCHAR, 
startDateMonth VARCHAR, 
startDateYear int,
endDateMonth VARCHAR,
endDateYear int,
currentlyStudyHere int, 
locationState VARCHAR);


CREATE table workExperience (id INTEGER PRIMARY KEY, 
title VARCHAR, 
company VARCHAR, 
startDateMonth VARCHAR, 
startDateYear int,
endDateMonth VARCHAR,
endDateYear int,
currentlyWorkHere int, 
locationCityState VARCHAR,
workResponsibilities VARCHAR);


CREATE table personalProjects (id INTEGER PRIMARY KEY, 
title VARCHAR, 
startDateMonth VARCHAR, 
startDateYear int,
endDateMonth VARCHAR,
endDateYear int,
currentProject int,
projectDescription VARCHAR,
githubLink VARCHAR);

