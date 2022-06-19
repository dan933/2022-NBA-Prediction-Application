import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link"

export default function Copyright(props: any) {
    // TODO: update link
    // UPDATED LINK TO GOV COPYRIGHT LAW WEBSITE
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Site created by Swinburne Team West; '}
        <Link color="inherit" target="_blank" href="https://github.com/dan933/2022-NBA-Prediction-Application">
          user contributions
        </Link>{' '}
        
        {'licensed under Copyright © '}
        <Link color="inherit" target="_blank" href="https://www.alrc.gov.au/publication/genes-and-ingenuity-gene-patenting-and-human-health-alrc-report-99/28-copyright-and-databases/copyright-law/">
          Dod & Gy
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }