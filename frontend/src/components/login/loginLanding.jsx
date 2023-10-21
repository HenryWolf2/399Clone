import HomeGraph from "../home/homeGraph";
import { Stack, Button} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const LoginLanding = () => {
    const BibTeX = `
@article{Long2023adducthunter,
title = {AdductHunter: Identifying Protein-Metal Complex Adducts in Mass Spectra},
author = {Derek Long and Liam Eade and Katharina Dost and Samuel M Meier-Menches and David C Goldstone and Matthew P Sullivan and Christian Hartinger and J\\"{o}rg Wicker and Katerina Taskova},
url = {https://adducthunter.wickerlab.org},
doi = {10.21203/rs.3.rs-3322854/v1},
year  = {2023},
date = {2023-05-29},
urldate = {2023-05-29},
abstract = {Mass spectrometry (MS) is an analytical technique for molecule identification that can be used for investigating protein-metal complex interactions. Once the MS data is collected, the mass spectra are usually interpreted manually to identify the adducts formed which arise from the interactions between proteins and metal-based species. However, with increasing resolution, dataset size, and species complexity, the time required to identify adducts and the error-prone nature of manual assignment have become limiting factors in MS analysis. AdductHunter is an analysis tool to automate the peak identification process using constraint integer optimization to find feasible combinations of protein and fragments, and dynamic time warping to calculate the dissimilarity between the theoretical isotope pattern of a species and its experimental isotope peak distribution. Our results show fast and accurate identification of protein adducts to aid mass spectrometry analysis.},
keywords = {cheminformatics, computational sustainability, data mining, dynamic time warping, machine learning, mass spectrometry},
pubstate = {forthcoming},
tppubtype = {article}
}`;
    const APA7 = "Derek Long, Liam Eade, Matthew P Sullivan et al. AdductHunter: Identifying Protein-Metal Complex Adducts in Mass Spectra, 05 September 2023, PREPRINT (Version 1) available at Research Square [https://doi.org/10.21203/rs.3.rs-3322854/v1]"
    
    return(
        <div>
            <div className= "landing-desc-box">
              <p className= "landingText">
              Mass spectrometry is a powerful analytical technique that has revolutionized research and analysis in various fields. With the ability to provide both qualitative and quantitative data, researchers can gain valuable insights into the chemical composition of substances.              
              </p>
              <p className= "landingText">
              Our platform takes mass spectrometry to the next level by providing an innovative environment for storing, sharing, and analyzing mass spectrometry data. Through advanced data analysis tools, researchers can perform various analytical techniques, and visualise data results with the use of interactive elements such as the example graph below.              
              </p>
              <br></br>
              
              <div style={{fontSize:'16px'}}>
              <Stack sx={{margin: "0px 20px 0px 20px"}}>
              <HomeGraph/>
              
              </Stack>
              </div>
              
              
              
              <p className= "landingText">
              Collaboration and data sharing are at the heart of our platform. By creating profiles, researchers can connect with like-minded individuals, form research groups, and share their analyzed data securely.               
              </p>
              <p className= "landingText">
              Don't miss out on this opportunity to join a vibrant community of mass spectrometry researchers. Register now and unlock the endless possibilities for collaboration, data sharing, and analysis on our platform. Together, let's push the boundaries of mass spectrometry research and make groundbreaking discoveries!
              </p>
              <Button onClick={() => navigator.clipboard.writeText(BibTeX)}
              sx={{ 
                fontSize: '0.75rem', 
                bgcolor: 'transparent', 
                marginLeft: '-10px',
                marginTop:'20px',
                '&:hover': { 
                  bgcolor: 'rgba(0, 0, 0, 0.04)', 
                },
              }}>BibTeX Citation &nbsp;<ContentCopyIcon fontSize='inherit'/></Button>
              <Button onClick={() => navigator.clipboard.writeText(APA7)}
              sx={{ 
                fontSize: '0.75rem', 
                bgcolor: 'transparent', 
                marginLeft: '10px',
                marginTop:'20px',
                '&:hover': { 
                  bgcolor: 'rgba(0, 0, 0, 0.04)', 
                },
              }}>APA 7 Citation &nbsp;<ContentCopyIcon fontSize='inherit'/></Button>
            </div>
            
        </div>
    )
}

export default LoginLanding;