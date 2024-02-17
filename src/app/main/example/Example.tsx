import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useForm } from 'react-hook-form';
import FormTextField from 'app/shared-components/form-fields/FormTextField';
import FormSelectBox from 'app/shared-components/form-fields/FormSelectBox';
import FormNumbericTextField from 'app/shared-components/form-fields/FormNumericTextField';
import FormDatePicker from 'app/shared-components/form-fields/FormDatePicker';
import { Button } from '@mui/material';
import FormCkeckbox from 'app/shared-components/form-fields/FormCkeckbox';
import FormImageUploader from 'app/shared-components/form-fields/form-image-uploader';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

export interface IFormField {
  selectbox: string | null;
  datepicker: Date | null;
  numeric: number;
  checkbox: boolean;
  textfield: string;
  image: File | null;
}

function ExamplePage() {
  const { t } = useTranslation('');
  const { control, handleSubmit } = useForm<IFormField>({
    defaultValues: {
      checkbox: false,
      textfield: '',
    },
  });
  const onsubmit = (data: IFormField) => {
    console.log(data);
  };
  return (
    <>
      <Root
        header={
          <div className="p-24">
            <h4>{t('TITLE')}</h4>
          </div>
        }
        content={
          <div className="p-24">
            <form onSubmit={handleSubmit(onsubmit)}>
              <FormImageUploader
                control={control}
                name="image"
                maxSize={240}
                accept={['.png', '.jpg']}
                rules={{ required: true }}
                label="عکس شناسنامه"
              />
              <FormSelectBox
                control={control}
                name="selectbox"
                label="sfsdf"
                options={[
                  {
                    label: 'fsdfdsf',
                    value: '24',
                  },
                  {
                    label: 'test',
                    value: '25',
                  },
                ]}
                rules={{ required: true }}
              />
              <FormNumbericTextField
                control={control}
                name="numeric"
                label="موبایل"
                useCurrencyFormatter
                rules={{ required: true }}
              />
              <FormCkeckbox control={control} name="checkbox" label="لیبل" defaultChecked />
              <FormTextField control={control} name="textfield" label="نام" />
              <FormDatePicker
                control={control}
                name="datepicker"
                label="sfsdf"
                rules={{
                  required: {
                    value: true,
                    message: 'Please enter',
                  },
                }}
                closeOnSelect={false}
              />

              <Button type="submit" variant="contained">
                ثبت
              </Button>
            </form>
          </div>
        }
        scroll="content"
      />
    </>
  );
}

export default ExamplePage;
