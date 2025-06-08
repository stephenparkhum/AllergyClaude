import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageUpload from '@/components/ImageUpload';
import * as imageUtils from '@/lib/utils/image';

jest.mock('@/lib/utils/image');

const mockImageUtils = imageUtils as jest.Mocked<typeof imageUtils>;

describe('ImageUpload', () => {
  const mockOnImageUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockImageUtils.isValidImageFile.mockReturnValue(true);
    mockImageUtils.convertFileToDataURL.mockResolvedValue('data:image/jpeg;base64,mockdata');
  });

  it('should render upload interface initially', () => {
    render(<ImageUpload onImageUpload={mockOnImageUpload} />);
    
    expect(screen.getByText('UPLOAD INGREDIENT PHOTO')).toBeInTheDocument();
    expect(screen.getByText('Drag and drop or click to select')).toBeInTheDocument();
    expect(screen.getByText('Choose File')).toBeInTheDocument();
  });

  it('should handle file selection', async () => {
    render(<ImageUpload onImageUpload={mockOnImageUpload} />);
    
    const fileInput = screen.getByRole('button', { name: /choose file/i }).previousElementSibling as HTMLInputElement;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(mockImageUtils.isValidImageFile).toHaveBeenCalledWith(file);
      expect(mockImageUtils.convertFileToDataURL).toHaveBeenCalledWith(file);
      expect(mockOnImageUpload).toHaveBeenCalledWith('data:image/jpeg;base64,mockdata');
    });
  });

  it('should show success message after upload', async () => {
    render(<ImageUpload onImageUpload={mockOnImageUpload} />);
    
    const fileInput = screen.getByRole('button', { name: /choose file/i }).previousElementSibling as HTMLInputElement;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('✓ Image uploaded successfully')).toBeInTheDocument();
      expect(screen.getByText('Upload Different Image')).toBeInTheDocument();
    });
  });

  it('should handle invalid file types', async () => {
    mockImageUtils.isValidImageFile.mockReturnValue(false);
    window.alert = jest.fn();
    
    render(<ImageUpload onImageUpload={mockOnImageUpload} />);
    
    const fileInput = screen.getByRole('button', { name: /choose file/i }).previousElementSibling as HTMLInputElement;
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please select a valid image file');
      expect(mockOnImageUpload).not.toHaveBeenCalled();
    });
  });

  it('should handle file conversion errors', async () => {
    mockImageUtils.convertFileToDataURL.mockRejectedValue(new Error('Conversion failed'));
    window.alert = jest.fn();
    
    render(<ImageUpload onImageUpload={mockOnImageUpload} />);
    
    const fileInput = screen.getByRole('button', { name: /choose file/i }).previousElementSibling as HTMLInputElement;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed to read the image file');
      expect(mockOnImageUpload).not.toHaveBeenCalled();
    });
  });

  it('should handle drag and drop', async () => {
    render(<ImageUpload onImageUpload={mockOnImageUpload} />);
    
    const dropZone = screen.getByText('Drag and drop or click to select').parentElement?.parentElement;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.drop(dropZone!, {
      dataTransfer: {
        files: [file],
      },
    });
    
    await waitFor(() => {
      expect(mockImageUtils.isValidImageFile).toHaveBeenCalledWith(file);
      expect(mockImageUtils.convertFileToDataURL).toHaveBeenCalledWith(file);
      expect(mockOnImageUpload).toHaveBeenCalledWith('data:image/jpeg;base64,mockdata');
    });
  });

  it('should handle drag over and drag leave events', () => {
    render(<ImageUpload onImageUpload={mockOnImageUpload} />);
    
    const dropZone = screen.getByText('Drag and drop or click to select').parentElement?.parentElement;
    
    fireEvent.dragOver(dropZone!);
    expect(dropZone).toHaveClass('border-primary');
    
    fireEvent.dragLeave(dropZone!);
    expect(dropZone).not.toHaveClass('border-primary');
  });
});