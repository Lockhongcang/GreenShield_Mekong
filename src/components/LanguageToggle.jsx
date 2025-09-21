import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ReactCountryFlag from 'react-country-flag';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const change = (lng) => {
    // guard: tránh gọi changeLanguage nếu đã cùng ngôn ngữ
    if (!i18n || i18n.language === lng) return;
    i18n.changeLanguage(lng);
  };

  // cấu trúc item cho antd (dễ mở rộng nếu thêm ngôn ngữ)
  const items = [
    {
      key: 'vi',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ReactCountryFlag countryCode="VN" svg style={{ width: 20, height: 14 }} aria-label="Vietnam flag" />
          <span style={{ fontWeight: 600 }}>VI</span>
        </span>
      ),
    },
    {
      key: 'en',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Dùng "GB" thay "US" nếu muốn cờ Anh; tuỳ chiến lược ngôn ngữ */}
          <ReactCountryFlag countryCode="GB" svg style={{ width: 20, height: 14 }} aria-label="United Kingdom flag" />
          <span style={{ fontWeight: 600 }}>EN</span>
        </span>
      ),
    },
  ];

  const currentIsVi = Boolean(i18n?.language && i18n.language.startsWith('vi'));

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => change(key),
      }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button
        type="text"
        aria-haspopup="true"
        aria-label="Language switcher"
        style={{ padding: '6px 10px', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
      >
        <Space size="small" align="center">
          <ReactCountryFlag
            countryCode={currentIsVi ? 'VN' : 'GB'}
            svg
            style={{ width: 20, height: 14 }}
            title={currentIsVi ? 'Vietnam' : 'United Kingdom'}
            aria-hidden={false}
            aria-label={currentIsVi ? 'Vietnam flag' : 'United Kingdom flag'}
          />
          <span>{currentIsVi ? 'VI' : 'EN'}</span>
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
