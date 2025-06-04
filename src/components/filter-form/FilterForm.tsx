import { Button } from '../form/button/Button';
import { DateInput } from '../form/date-input/DateInput';
import { Input } from '../form/input/Input';
import './filter-form.css';

export const FilterForm = () => {
  return (
    <div className="filter-form-container">
      <form action="" className="filter-form">
        <h1>Busque seus vôos!</h1>
        <div className="origin-destination-container">
          <Input label="Origem" placeholder="Selecione sua origem..." />
          <Input label="Destino" placeholder="Selecione seu destino..." />
        </div>
        <div className="departure-arrival-container">
          <DateInput label="Saída" />
          <DateInput label="Chegada" />
        </div>
        <div className="button-container">
          <Button content="Buscar" />
        </div>
      </form>
    </div>
  );
};
