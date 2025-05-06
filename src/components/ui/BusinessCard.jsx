import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const BusinessCard = ({ name, title, email, link }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'BusinessCard');

  // 从样式中获取背景色
  const bgColorClass = styles.container.split(' ')[0];
  const bgColor = darkMode ? '#1e293b' : getBgColorFromClass(bgColorClass);

  const editorStyle = {
    fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
    backgroundColor: bgColor,
    color: darkMode ? '#d4d4d4' : '#1e293b',
    borderRadius: '24px', // 更大的圆角，与其他组件匹配
    padding: '20px',
    boxShadow: darkMode
      ? '0 10px 25px rgba(0, 0, 0, 0.2)'
      : '0 10px 25px rgba(0, 0, 0, 0.05)',
    width: '100%',
    height: '100%',
    minHeight: '280px' // 增加高度以匹配其他组件
  };

  // 从Tailwind类名获取实际的颜色值
  function getBgColorFromClass(className) {
    switch(className) {
      case 'bg-purple-100': return '#ede9fe';
      case 'bg-blue-100': return '#dbeafe';
      case 'bg-green-100': return '#dcfce7';
      case 'bg-yellow-100': return '#fef9c3';
      case 'bg-pink-100': return '#fce7f3';
      case 'bg-indigo-100': return '#e0e7ff';
      case 'bg-teal-100': return '#ccfbf1';
      case 'bg-orange-100': return '#ffedd5';
      default: return '#f8fafc';
    }
  }

  // 获取稍微深一点的背景色，用于标题栏和工具栏
  const headerBgColor = darkMode ? '#172033' : getDarkerBgColor(bgColorClass);

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    paddingBottom: '8px',
    borderBottom: darkMode ? '1px solid #2d3748' : '1px solid #e2e8f0',
    backgroundColor: headerBgColor,
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    padding: '8px 16px'
  };

  // 获取稍微深一点的背景色
  function getDarkerBgColor(className) {
    switch(className) {
      case 'bg-purple-100': return '#ddd6fe'; // purple-200
      case 'bg-blue-100': return '#bfdbfe';   // blue-200
      case 'bg-green-100': return '#bbf7d0';  // green-200
      case 'bg-yellow-100': return '#fef08a'; // yellow-200
      case 'bg-pink-100': return '#fbcfe8';   // pink-200
      case 'bg-indigo-100': return '#c7d2fe'; // indigo-200
      case 'bg-teal-100': return '#99f6e4';   // teal-200
      case 'bg-orange-100': return '#fed7aa'; // orange-200
      default: return '#e2e8f0';              // gray-200
    }
  }

  const circleStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '6px'
  };

  const lineNumberStyle = {
    color: darkMode ? '#858585' : '#94a3b8',
    userSelect: 'none',
    textAlign: 'right',
    width: '24px',
    display: 'inline-block',
    paddingRight: '10px',
    marginRight: '10px',
    borderRight: darkMode ? '1px solid #2d3748' : '1px solid #e2e8f0' // 更新边框颜色
  };

  const propertyStyle = {
    color: darkMode ? '#f88070' : '#f97316' // salmon pink/orange for properties
  };

  const valueStyle = {
    color: darkMode ? '#dcdcaa' : '#ca8a04' // yellowish for values
  };

  const titleStyle = {
    marginLeft: '10px',
    flexGrow: 1,
    fontSize: '16px',
    fontWeight: 'normal',
    color: darkMode ? '#d4d4d4' : '#1e293b'
  };

  return (
    <div className="col-span-4">
      <div style={editorStyle}>
        <div style={headerStyle}>
          <div style={{...circleStyle, backgroundColor: '#ff6057'}}></div>
          <div style={{...circleStyle, backgroundColor: '#ffbd2e'}}></div>
          <div style={{...circleStyle, backgroundColor: '#27c93f'}}></div>
          <h1 style={titleStyle}>Tony Ye.json</h1>
          <div style={{color: darkMode ? '#858585' : '#94a3b8'}}>...</div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: darkMode ? '1px solid #2d3748' : '1px solid #e2e8f0',
          backgroundColor: headerBgColor
        }}>
          <div style={{display: 'flex', alignItems: 'center', margin: '0 8px', color: darkMode ? '#d4d4d4' : '#475569'}}>
            {/* Document icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" style={{marginRight: '12px'}}>
              <path fill="currentColor" d="M14,2H6C4.9,2 4,2.9 4,4V20C4,21.1 4.9,22 6,22H18C19.1,22 20,21.1 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>

            {/* Document preview icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" style={{marginRight: '12px'}}>
              <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M6,4H13L18,9V20H6V4M8,12A3,3 0 0,0 11,15A3,3 0 0,0 14,12A3,3 0 0,0 11,9A3,3 0 0,0 8,12Z" />
            </svg>

            {/* Folder icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" style={{marginRight: '12px'}}>
              <path fill="currentColor" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" />
            </svg>

            {/* Download icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" style={{marginRight: '12px'}}>
              <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
            </svg>

            {/* Refresh icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" style={{marginRight: '12px'}}>
              <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
            </svg>

            {/* Braces icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" style={{marginRight: '12px'}}>
              <path fill="currentColor" d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z" />
            </svg>
          </div>
          <div style={{flexGrow: 1}}></div>

          {/* Right box icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" style={{marginRight: '8px', color: darkMode ? '#d4d4d4' : '#475569'}}>
            <path fill="currentColor" d="M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
          </svg>

          {/* Three dots icon */}
          <div style={{color: darkMode ? '#d4d4d4' : '#475569', fontWeight: 'bold', fontSize: '18px'}}>...</div>
        </div>

        <div className="font-mono text-sm">
          <div className="mb-1 flex">
            <span style={lineNumberStyle}>1</span>
            <div>Tony Ye.json</div>
          </div>
          <div className="mb-1 flex">
            <span style={lineNumberStyle}>2</span>
            <div>&#123;</div>
          </div>
          <div className="mb-1 flex">
            <span style={lineNumberStyle}>3</span>
            <div className="ml-4">
              <span style={propertyStyle}>"name"</span>
              <span>: </span>
              <span style={valueStyle}>"{name}"</span>,
            </div>
          </div>
          <div className="mb-1 flex">
            <span style={lineNumberStyle}>4</span>
            <div className="ml-4">
              <span style={propertyStyle}>"title"</span>
              <span>: </span>
              <span style={valueStyle}>"{title}"</span>,
            </div>
          </div>
          <div className="mb-1 flex">
            <span style={lineNumberStyle}>5</span>
            <div className="ml-4">
              <span style={propertyStyle}>"email"</span>
              <span>: </span>
              <span style={valueStyle}>"{email}"</span>,
            </div>
          </div>
          <div className="mb-1 flex">
            <span style={lineNumberStyle}>6</span>
            <div className="ml-4">
              <span style={propertyStyle}>"link"</span>
              <span>: </span>
            </div>
          </div>
          <div className="mb-1 flex">
            <span style={lineNumberStyle}></span>
            <div className="ml-4">
              <span style={valueStyle}>"{link}"</span>
            </div>
          </div>
          <div className="mb-1 flex">
            <span style={lineNumberStyle}>7</span>
            <div>&#125;</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
