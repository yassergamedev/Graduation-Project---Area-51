import React, { useState } from 'react';
import FormInput from './FormInput';
import './styles/TagsCreator.css'


const TagsCreator = ({ onCreateTags }) => {
    const [domains, setDomains] = useState(['']);
    const [domain, setDomain] = useState('');
    const [companies, setCompanies] = useState(['']);
    const [company, setCompany] = useState('');
    const [learningPoints, setLearningPoints] = useState('');
    const [practicePoints, setPracticePoints] = useState('');
    const [coins, setCoins] = useState('');

    const handleAddDomain = () => {
        setDomains([...domains, domain]);
    }

    const handleAddCompany = () => {
        setCompanies([...companies, company]);
    }

    const handleDomainChange = (event) => {
        setDomain(event.target.value)

    }

    const handleCompanyChange = (event) => {
        setCompany(event.target.value)

    }

    const removeCompany = (index) => {
        const newDomains = [...companies];
        newDomains.splice(index, 1);
        setCompanies(newDomains);
      }
      

    const removeDomain = (index) => {
        const newDomains = [...domains];
        newDomains.splice(index, 1);
        setDomains(newDomains);
      }
      

    const handleSubmit = (event) => {
        event.preventDefault();

        const domainsData = domains;
        const companiesData = companies;

        const tagsData = {
            domaine: domainsData,
            entreprise: companiesData,
            learning_points: learningPoints,
            practice_points: practicePoints,
            coins: coins
        };

       
        onCreateTags(tagsData)
    };

    return (
        <form className="tags-creator" onSubmit={handleSubmit}>
            
            {domains.map((domain, index) => (
                <div key={index} className="tag-input">
                    <div className="tag tag-domain">{domain}</div>
                    <div className="tag" onClick={removeDomain}>-</div>
                </div>
            ))}
            <div className="tag-input">
                <FormInput className="form-input tag-input-domain" label={`Domain Name`} name="domain" type="text" value={domain} handleChange={handleDomainChange} />
                <div className="tag tag-domain" onClick={handleAddDomain}>+</div>
            </div>


            {companies.map((company, index) => (
                <div key={index} className="tag-input">
                    <div className="tag tag-company">{company}</div>
                    <div className="tag" onClick={removeCompany}>-</div>
                </div>
            ))}
            <div className="tag-input">
                <FormInput className="form-input tag-input-company" label={`Company Name`} name="company" type="text" value={company} handleChange={handleCompanyChange} />
                <div className="tag tag-company" onClick={handleAddCompany}>+</div>
            </div>
            
            <FormInput className="form-input lp" label="Learning Points" name="learningPoints" type="number" value={learningPoints} handleChange={(event) => setLearningPoints(event.target.value)} />

            <FormInput className="form-input pp" label="Practice Points" name="practicePoints" type="number" value={practicePoints} handleChange={(event) => setPracticePoints(event.target.value)} />

            <FormInput className="form-input coins" label="Coins" name="coins" type="number" value={coins} handleChange={(event) => setCoins(event.target.value)} />

            <button type="submit" onClick={handleSubmit}>Add Tags</button>
        </form>
    );
};

export default TagsCreator;
