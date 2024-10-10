import { Field, ErrorMessage, useFormikContext } from 'formik';
import { useState } from 'react';

// 이미지 경로
import NHBank from '@/assets/img/bank/NHBank.svg';
import KakaoBank from '@/assets/img/bank/KakaoBank.svg';
import KBBank from '@/assets/img/bank/KBBank.svg';
import TossBank from '@/assets/img/bank/TossBank.svg';
import ShinhanBank from '@/assets/img/bank/ShinhanBank.svg';
import WooriBank from '@/assets/img/bank/WooriBank.svg';
import IBKBank from '@/assets/img/bank/IBKBank.svg';
import HanaBank from '@/assets/img/bank/HanaBank.svg';
import SaemaeulBank from '@/assets/img/bank/SaemaeulBank.svg';
import BusanBank from '@/assets/img/bank/BusanBank.svg';
import DaeguBank from '@/assets/img/bank/DaeguBank.svg';
import Kbank from '@/assets/img/bank/Kbank.svg';
import Sinhyup from '@/assets/img/bank/Sinhyup.svg';
import Uhs from '@/assets/img/bank/Uhs.svg';
import ScBank from '@/assets/img/bank/ScBank.svg';
import KyongnamBank from '@/assets/img/bank/KyongnamBank.svg';
import GwangjuBank from '@/assets/img/bank/GwangjuBank.svg';
import Suhyup from '@/assets/img/bank/Suhyup.svg';
import SBBank from '@/assets/img/bank/SBBank.svg';
import JejuBank from '@/assets/img/bank/JejuBank.svg';
import CitiBank from '@/assets/img/bank/CitiBank.svg';
import KDBBank from '@/assets/img/bank/KDBBank.svg';
import SanrimBank from '@/assets/img/bank/SanrimBank.svg';
import BankOfAmerica from '@/assets/img/bank/BankOfAmerica.svg';
import ChinaIndustrial from '@/assets/img/bank/ChinaIndustrial.svg';
import Deutsche from '@/assets/img/bank/Deutsche.svg';
import JPMorgan from '@/assets/img/bank/JPMorgan.svg';
import BNP from '@/assets/img/bank/BNP.svg';
import ChinaConstruction from '@/assets/img/bank/ChinaConstruction.svg';

const RegisterAccountStep1 = () => {
	const { setFieldValue } = useFormikContext();
	const [selectedBank, setSelectedBank] = useState(null);

	const banks = [
		{ value: '농협', label: 'NH농협', img: NHBank },
		{ value: 'KakaoBank', label: '카카오 뱅크', img: KakaoBank },
		{ value: '국민', label: '국민은행', img: KBBank },
		{ value: 'TossBank', label: '토스 뱅크', img: TossBank },
		{ value: 'ShinhanBank', label: '신한', img: ShinhanBank },
		{ value: '우리', label: '우리', img: WooriBank },
		{ value: 'IBKBank', label: 'IBK기업', img: IBKBank },
		{ value: '하나', label: '하나', img: HanaBank },
		{ value: 'SaemaeulBank', label: '새마을', img: SaemaeulBank },
		{ value: 'BusanBank', label: '부산', img: BusanBank },
		{ value: 'DaeguBank', label: '대구', img: DaeguBank },
		{ value: 'Kbank', label: '케이뱅크', img: Kbank },
		{ value: 'Sinhyup', label: '신협', img: Sinhyup },
		{ value: 'Uhs', label: '우체국', img: Uhs },
		{ value: 'ScBank', label: 'SC제일은행', img: ScBank },
		{ value: 'KyongnamBank', label: '경남', img: KyongnamBank },
		{ value: 'GwangjuBank', label: '광주은행', img: GwangjuBank },
		{ value: 'Suhyup', label: '수협', img: Suhyup },
		{ value: 'SBBank', label: '저축은행', img: SBBank },
		{ value: 'JejuBank', label: '제주', img: JejuBank },
		{ value: 'KDBBank', label: 'KDB산업', img: KDBBank },
		{ value: 'CitiBank', label: '씨티', img: CitiBank },
		{ value: 'SanrimBank', label: '산림조합', img: SanrimBank },
		{ value: 'BankOfAmerica', label: 'BOA', img: BankOfAmerica },
		{ value: 'ChinaIndustrial', label: '중국공상', img: ChinaIndustrial },
		{ value: 'Deutsche', label: '도이치은행', img: Deutsche },
		{ value: 'JPMorgan', label: 'JP모건', img: JPMorgan },
		{ value: 'BNP', label: 'BNP파리바', img: BNP },
		{ value: 'ChinaConstruction', label: '중국건설', img: ChinaConstruction },
	];

	const handleBankSelect = (bank) => {
		setSelectedBank(bank.value);
		setFieldValue('bank', bank.value); // 은행 값 설정
		setFieldValue('bankLabel', bank.label); // 은행 이름 설정
		setFieldValue('bankIcon', bank.img); // 은행 아이콘 경로 설정
	};

	return (
		<div className="registration-step-container">
			<div className="registration-step-title">은행 선택</div>
			<div className="registration-step-content select-bank-content">
				<div className="welcome-message">은행을 선택해주세요</div>
				<div className="bank-grid">
					{banks.map((bank) => (
						<div
							key={bank.value}
							className={`bank-item ${selectedBank === bank.value ? 'selected' : ''}`}
							onClick={() => handleBankSelect(bank)}
						>
							<img
								src={bank.img}
								alt={bank.label}
								className="bank-image"
							/>
							<div className="bank-label">{bank.label}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RegisterAccountStep1;
