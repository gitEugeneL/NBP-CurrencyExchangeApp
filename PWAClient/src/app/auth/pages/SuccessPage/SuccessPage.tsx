import WarningCard from '../../../../components/WarningCard/WarningCard.tsx';

export default function SuccessPage() {
  return (
    <div>
      <WarningCard
        appearance='speed'
        title='You have been successfully registered!'
        buttonName='Login'
        redirectRoute='/auth/login'
      />
    </div>
  );
}
