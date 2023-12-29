'use client'

import { Box ,Typography } from '@mui/material';
import Link from 'next/link';

const Todo = ({todo}) => {

    return (
    <Box  display="flex" alignItems="center" gap='5px' marginY="8px">
    {/* <Checkbox  /> */}
    <Typography color='secondary' variant="a" sx={{ flexGrow: 1, mr: '16px', textDecoration:  'none' }}>
    <Link href={`/todo/${todo.id}`}>
      {todo.body}
    </Link>
    </Typography>

    </Box>
    );
}

export default Todo;



