import { Field, ErrorMessage, useFormikContext } from 'formik';

const RegisterAccountStep1 = () => {
	const { setFieldValue } = useFormikContext();

	const banks = [
		{ value: 'kbank', label: 'KBank' },
		{ value: 'shinhan', label: 'Shinhan Bank' },
		{ value: 'hana', label: 'Hana Bank' },
		{ value: 'woori', label: 'Woori Bank' },
	];

	return (
		<div>
			<h2>Step 1: 은행 선택</h2>
			<div>
				<label htmlFor="bank">은행을 선택하세요</label>
				<Field
					as="select"
					id="bank"
					name="bank"
					onChange={(e) => setFieldValue('bank', e.target.value)}
				>
					<option value="">은행을 선택하세요</option>
					{banks.map((bank) => (
						<option
							key={bank.value}
							value={bank.value}
						>
							{bank.label}
						</option>
					))}
				</Field>
				<ErrorMessage
					name="bank"
					component="div"
					className="error"
				/>
			</div>
		</div>
	);
};

export default RegisterAccountStep1;
