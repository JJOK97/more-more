import React from 'react';
import '@/assets/css/groupAccount/GroupAccount.css';

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

const banks = [
	{ value: 'NHBank', img: NHBank },
	{ value: 'KakaoBank', img: KakaoBank },
	{ value: 'KBBank', img: KBBank },
	{ value: 'TossBank', img: TossBank },
	{ value: 'ShinhanBank', img: ShinhanBank },
	{ value: 'WooriBank', img: WooriBank },
	{ value: 'IBKBank', img: IBKBank },
	{ value: 'HanaBank', img: HanaBank },
	{ value: 'SaemaeulBank', img: SaemaeulBank },
	{ value: 'BusanBank', img: BusanBank },
	{ value: 'DaeguBank', img: DaeguBank },
	{ value: 'Kbank', img: Kbank },
	{ value: 'Sinhyup', img: Sinhyup },
	{ value: 'Uhs', img: Uhs },
	{ value: 'ScBank', img: ScBank },
	{ value: 'KyongnamBank', img: KyongnamBank },
	{ value: 'GwangjuBank', img: GwangjuBank },
	{ value: 'Suhyup', img: Suhyup },
	{ value: 'SBBank', img: SBBank },
	{ value: 'JejuBank', img: JejuBank },
	{ value: 'KDBBank', img: KDBBank },
	{ value: 'CitiBank', img: CitiBank },
	{ value: 'SanrimBank', img: SanrimBank },
	{ value: 'BankOfAmerica', img: BankOfAmerica },
	{ value: 'ChinaIndustrial', img: ChinaIndustrial },
	{ value: 'Deutsche', img: Deutsche },
	{ value: 'JPMorgan', img: JPMorgan },
	{ value: 'BNP', img: BNP },
	{ value: 'ChinaConstruction', img: ChinaConstruction },
];

const BankSelectModal = ({ onClose, onSelect }) => {
	return (
		<div className="bank-modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h2>은행 선택</h2>
					<button onClick={onClose}>닫기</button>
				</div>
				<div className="bank-grid">
					{banks.map((bank) => (
						<div
							key={bank.value}
							className="bank-item"
							onClick={() => onSelect(bank)}
						>
							<img
								src={bank.img}
								alt={bank.value}
								className="bank-image"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BankSelectModal;
