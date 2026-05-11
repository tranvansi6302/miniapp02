import React from 'react';
import { StandardPage } from 'ejsc-ma-component';
import { BookingEmpty } from '~/features/booking';

const BookingScreen: React.FC = () => {
  return (
    <StandardPage title="Đặt lịch">
      <div className="p-4">
        <BookingEmpty />
      </div>
    </StandardPage>
  );
};

export default BookingScreen;
