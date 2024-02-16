import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`}  primaryTypographyProps={{ color: '#9E7C0C' }} />
       
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (
    <div >
    <Box
      sx={{ width: '100%', height: '100%', maxWidth: 300, bgcolor: '#241773' }}
    >
      <FixedSizeList
        height={900}
        width={300}
        itemSize={46}
        itemCount={20}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
    </div>
  );
}