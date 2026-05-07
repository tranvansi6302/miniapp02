/**
 * @file pages/UiUxScreen.tsx
 * @description Trang trải nghiệm UI/UX chuẩn Master Tokens.
 */
import React, { useState } from 'react';
import {
  Button,
  Sheet,
  SheetHeader,
  SheetBody,
  SheetFooter,
  Modal,
  toast,
  dialog,
  Calendar,
  DatePickerWheel,
  Text,
  Card,
  StandardPage
} from 'ejsc-ma-component';
import { Settings, Trash2, Send, Plus, Sparkles, Calendar as CalendarIcon, Sliders, Layers } from 'lucide-react';

const UiUxScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputText, setInputText] = useState('');

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);

  const [draftDate, setDraftDate] = useState(new Date());

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Dữ liệu đã được cập nhật!');
  };

  const openWheel = () => {
    setDraftDate(new Date(selectedDate));
    setIsWheelOpen(true);
  };

  const applyWheelDate = () => {
    setSelectedDate(new Date(draftDate));
    setIsWheelOpen(false);
    toast.success(`Đã cập nhật: ${draftDate.toLocaleDateString('vi-VN')}`);
  };

  return (
    <StandardPage
      title="UI/UX Components"
      onRefresh={handleRefresh}
    >
      <div className="flex flex-col gap-6 p-6">
        {/* NÚT BẤM (BUTTONS) */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 mb-3">
            <Sliders size={16} className="text-red-600" />
            <Text variant="base" weight="bold">Buttons</Text>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" theme="brand">Brand</Button>
            <Button size="sm" theme="neutral">Neutral</Button>
            <Button size="sm" theme="danger">Danger</Button>
            <Button size="sm" theme="ghost">Ghost</Button>
          </div>
        </Card>

        {/* CHỌN NGÀY THÁNG */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon size={16} className="text-red-600" />
            <Text variant="base" weight="bold">Date & Time Pickers</Text>
          </div>
          <div className="flex gap-2 mb-3">
            <Button size="sm" theme="brand" className="flex-1" onClick={() => setIsCalendarOpen(true)}>
              Calendar
            </Button>
            <Button size="sm" theme="neutral" className="flex-1" onClick={openWheel}>
              Wheel
            </Button>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
            <Text variant="tiny" className="text-slate-400 block mb-1">Selected Date:</Text>
            <Text variant="caption" weight="bold" className="text-red-600">
              {selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
            </Text>
          </div>
        </Card>

        {/* LỚP PHỦ & THÔNG BÁO */}
        <Card className="p-4 rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={16} className="text-red-600" />
            <Text variant="base" weight="bold">Overlays & Notifications</Text>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" theme="brand" onClick={() => setIsModalOpen(true)}>Modal</Button>
            <Button size="sm" theme="neutral" onClick={() => setIsSheetOpen(true)}>Sheet</Button>
            <Button size="sm" theme="neutral" onClick={() => toast.success('Success!')}>Success</Button>
            <Button size="sm" theme="danger" onClick={() => dialog.confirm('Are you sure?', 'Confirm')}>Dialog</Button>
          </div>
        </Card>
      </div>

      {/* --- OVERLAY INSTANCES --- */}

      <Modal
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        pure
      >
        <Calendar
          value={selectedDate}
          onChange={(d) => {
            setSelectedDate(d);
            setIsCalendarOpen(false);
            toast.success(`Đã chọn: ${d.toLocaleDateString('vi-VN')}`);
          }}
          onClose={() => setIsCalendarOpen(false)}
        />
      </Modal>

      <Sheet
        open={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
        layout="inset"
      >
        <SheetHeader title="Chọn ngày tháng" onClose={() => setIsWheelOpen(false)} />
        <SheetBody>
          <div className="py-2">
            <DatePickerWheel
              value={draftDate}
              onChange={setDraftDate}
            />
          </div>
        </SheetBody>
        <SheetFooter>
          <Button theme="brand" block onClick={applyWheelDate}>Áp dụng</Button>
        </SheetFooter>
      </Sheet>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <Text variant="h3" weight="bold" block className="mb-2">Native Modal</Text>
          <Text variant="sub" color="sub" block className="mb-6">Modal đã được cập nhật bo góc chuẩn Master Tokens.</Text>
          <Button theme="brand" block onClick={() => setIsModalOpen(false)}>Đóng</Button>
        </div>
      </Modal>

      <Sheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)} layout="inset">
        <SheetHeader title="Bottom Sheet" onClose={() => setIsSheetOpen(false)} />
        <SheetBody className="flex flex-col items-center py-10 gap-4">
          <div className="w-16 h-16 bg-ejsc-brand-light rounded-full flex items-center justify-center text-[28px]">✨</div>
          <Text variant="base" weight="bold" block>Master Tokens</Text>
          <Text variant="caption" color="sub" block className="text-center">Hệ thống bo góc và màu sắc đồng bộ.</Text>
        </SheetBody>
        <SheetFooter>
          <Button theme="neutral" block onClick={() => setIsSheetOpen(false)}>Xong</Button>
        </SheetFooter>
      </Sheet>
    </StandardPage>
  );
};

export default UiUxScreen;
