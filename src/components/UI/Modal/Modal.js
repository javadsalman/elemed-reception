import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import { Button } from '@material-ui/core';
import { Fragment, forwardRef, memo } from 'react';

function Modal (props, ref) {
	const  modal = (
		<Fragment>
			<Backdrop click={props.onClose} />

			<div className={classes.Modal}>
				<div className={classes.Title}>
					{props.title}
				</div>
				<div className={classes.Content} ref={ref}>
					{props.children}
				</div>
				<div className={classes.Footer}>
					<div className={classes.ButtonGroup}>

						{props.buttons.map((button, index)=>(
						<Button 
							key={index}
							className={classes.Button} 
							variant="contained" 
							style={{
								backgroundColor: button.backgroundColor,
								color: button.color
							}}
							onClick={()=>{props.dispatch(button.actionType)}}>
							{button.name}
						</Button>
						))}

						<Button 
							className={classes.Button}
							variant="contained" 
							color="default"
							onClick={props.onClose}>
							Çıx</Button>
					</div>
				</div>
			</div>
		</Fragment>
		
	)


	return modal;
}

export default memo(forwardRef(Modal));