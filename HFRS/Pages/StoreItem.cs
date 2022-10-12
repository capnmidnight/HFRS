using Juniper;

using System.Text.Json;

using static System.IO.File;

namespace HFRS.Pages
{
    public class StoreItem
    {

        private static StoreItem[]? GetItems()
        {
            if (!Exists("fileData.json"))
            {
                return null;
            }

            var json = ReadAllText("fileData.json");
            if (string.IsNullOrEmpty(json))
            {
                return null;
            }

            return JsonSerializer.Deserialize<StoreItem[]>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }

        public static Dictionary<string, StoreItem?> GetItemDictionary() => 
            GetItems()?.ToDictionary(d => d.ID ?? "") ?? new();

        private static readonly Dictionary<string, string> icons = new()
        {
            { "ppt", "powerpoint" },
            { "pptx", "powerpoint" },
            { "pdf", "pdf" }
        };

        public string? ID { get; set; }
        public string? Name { get; set; }
        public string? FileName { get; set; }
        public int? Amount { get; set; }
        public string Price => Amount is null ? "(free)" : (Amount.Value / 100f).ToString("C");
        public string? Description { get; set; }
        public bool IsAttachment => Description == "attachment";

        private string? _type;
        public string? Type
        {
            get
            {
                if (_type is null && FileName is not null)
                {
                    _type = PathExt.GetShortExtension(FileName);
                }

                return _type;
            }
        }

        public string? Icon
        {
            get
            {
                if(Type is null)
                {
                    return null;
                }

                return icons.Get(Type, "powerpoint");
            }
        }

        private FileInfo? _file;
        public FileInfo? File
        {
            get
            {
                if(_file is null && FileName is not null)
                {
                    _file = new FileInfo(Path.Combine("resources", FileName));
                }

                return _file;
            }
        }

        public string? Size
        {
            get
            {
                if(File is null) {
                    return null;
                }

                return Juniper.Units.FileSize.Format(File.Length);
            }
        }

        public MediaType? _contentType;
        public MediaType ContentType
        {
            get
            {
                if(_contentType is null && FileName is not null)
                {
                    _contentType = MediaType.GuessByFileName(FileName).FirstOrDefault();
                }

                return _contentType ?? MediaType.Application_Octet_Stream;
            }
        }
    }
}
