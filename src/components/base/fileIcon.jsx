import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';

const fileIcon = (fileName) => {
  if (fileName.endsWith('.pdf')) return <PictureAsPdfTwoToneIcon />;
  if (fileName.match(/\.(doc|docx)$/)) return <DescriptionTwoToneIcon />;
  if (fileName.match(/\.(jpeg|jpg|png|gif)$/)) return <ImageTwoToneIcon />;
  return <InsertDriveFileTwoToneIcon />;
};

export default fileIcon;
