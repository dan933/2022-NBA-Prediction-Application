import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CreateDesktopMobileViews = () => {
    const theme = useTheme();
    //returns boolean 
    const IsMobile = useMediaQuery(theme.breakpoints.down('md'))
    const IsdefaultView = useMediaQuery(theme.breakpoints.up('md'))
    //uses boolean to determine which view to show
    const mobileView = IsMobile ? { visibility: "visible" } : { visibility: "hidden",  maxHeight:'0', overflow:'hidden' }
    const defaultView = IsdefaultView ? { visibility: "visible" } : { visibility: "hidden", maxHeight: '0', overflow: 'hidden' }
    
    return [mobileView,defaultView]
}

export default {CreateDesktopMobileViews};