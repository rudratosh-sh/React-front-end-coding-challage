import React, { useState, useCallback, memo } from "react";
import Creatable from "react-select/creatable";
import { Button } from 'react-bootstrap';
import { withAsyncPaginate, AsyncPaginate } from "react-select-async-paginate";

import * as api from "./api";

const increaseUniq = uniq => uniq + 1;

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);
const Privilege = localStorage.getItem('roles');

const Dashboard = () => {
	console.log(localStorage.getItem('roles'));
	const [cacheUniq, setCacheUniq] = useState(0);
	const [isAddingInProgress, setIsAddingInProgress] = useState(false);
	const [value, onChange] = useState(null);

	const onCreateOption = useCallback(async inputValue => {
		setIsAddingInProgress(true);

		const newOption = await api.addNewOption(inputValue);

		setIsAddingInProgress(false);
		setCacheUniq(increaseUniq);
		onChange(newOption);
	}, []);

	const formatCreateLabel = inputValue => (
		<><span>"{inputValue}" not found </span> <Button style={{ float: 'right' }} variant="outline-primary">Add & Select</Button>{' '}</>
	);

	return (
		<div>

			<div className="row">
				<div className="col-md-4"></div>
				{Privilege=='SUPER_ADMIN' ? 
				<div className="col-md-3">
					<h5>Search Non Existing/ Add & Select</h5>
					<CreatableAsyncPaginate
						SelectComponent={Creatable}
						inputProps={{ id: 'creatable' }}
						isDisabled={isAddingInProgress}
						value={value}
						loadOptions={api.loadOptions}
						onCreateOption={onCreateOption}
						onChange={onChange}
						cacheUniqs={[cacheUniq]}
						formatCreateLabel={formatCreateLabel}
						// theme={theme => ({
						// 	...theme,
						// 	colors: {
						// 		...theme.colors,
						// 		primary25: 'hotpink',
						// 	},
						// })}
						styles={{
							option: (providedStyles, props) => ({
								...providedStyles, // To keep the default style
								background: props.data.__isNew__ && '#ffffff',
								"&:active": {
									background: props.data.__isNew__ && '#ffffff'
								}
							})
						}}

					/>
					<p>Current value is {JSON.stringify(value)}</p>
				</div> :
				<div className="col-md-3">
					<h5>Standard Drop Down</h5>
					<AsyncPaginate
						SelectComponent={Creatable}
						inputProps={{ id: 'simple' }}
						isDisabled={isAddingInProgress}
						value={value}
						loadOptions={api.loadOptions}
						onCreateOption={onCreateOption}
						onChange={onChange}
						cacheUniqs={[cacheUniq]}
						formatCreateLabel={formatCreateLabel}
						// theme={theme => ({
						// 	...theme,
						// 	colors: {
						// 		...theme.colors,
						// 		primary25: 'hotpink',
						// 	},
						// })}
						styles={{
							option: (providedStyles, props) => ({
								...providedStyles, // To keep the default style
								background: props.data.__isNew__ && '#ffffff',
								"&:active": {
									background: props.data.__isNew__ && '#ffffff'
								}
							})
						}}
					/>
					<p>Current value is {JSON.stringify(value)}</p>
				</div>
				}
			</div>
		</div>
	);
};

export default memo(Dashboard);
